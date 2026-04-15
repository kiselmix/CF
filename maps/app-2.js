// Main app logic extracted from the former inline <script> tag.
window.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map', { crs: L.CRS.Simple, minZoom: -1, maxZoom: 3 });

  /*	map.on('click', (e) => {
		  console.log(`x: ${Math.round(e.latlng.lng)}, y: ${Math.round(e.latlng.lat)}`);
		  console.log({ x: e.latlng.lng, y: e.latlng.lat });
		}); */


      let currentOverlay = null;
  	let currentMapKey = null;
      let markerState = null;

      function setMap(mapKey) {
        const cfg = GAME_MAPS[mapKey];
        if (!cfg) return;

        currentMapKey = mapKey;
        history.replaceState(null, '', '?map=' + encodeURIComponent(mapKey));
  		document.getElementById('currentMapTitle').textContent = cfg.title;
  		renderMapSelect(); 
        // overlay
        if (currentOverlay) map.removeLayer(currentOverlay);
        currentOverlay = L.imageOverlay(cfg.svg, cfg.bounds).addTo(map);

        // markers
        if (markerState?.destroy) markerState.destroy();
        markerState = createMarkerSystem({
          map,
          points: cfg.points,
          onPortalClick: (targetMapKey) => setMap(targetMapKey),
          sidebarRoot: document.getElementById('markerToggles')
        });

        map.fitBounds(cfg.bounds);
      }
	
	
  	const mapSelectEl = document.getElementById('mapSelect');
  	const mapSelectBtn = document.getElementById('mapSelectBtn');
  	const mapSelectList = document.getElementById('mapSelectList');

  	function renderMapSelect() {

  	  const entries = Object.entries(GAME_MAPS);


  	  entries.sort((a, b) => a[1].title.localeCompare(b[1].title));

  	  mapSelectList.innerHTML = '';

  	  for (const [key, cfg] of entries) {
  		const item = document.createElement('div');
  		item.className = 'map-select-item' + (key === currentMapKey ? ' active' : '');
  		item.textContent = cfg.title;

  		item.addEventListener('click', () => {
  		  closeMapSelect();
  		  setMap(key);
  		});

  		mapSelectList.appendChild(item);
  	  }
  	}

  	function openMapSelect() {
  	  mapSelectEl.classList.add('open');
  	}

  	function closeMapSelect() {
  	  mapSelectEl.classList.remove('open');
  	}

  	function toggleMapSelect() {
  	  mapSelectEl.classList.toggle('open');
  	}

  	mapSelectBtn.addEventListener('click', (e) => {
  	  e.stopPropagation();
  	  toggleMapSelect();
  	});


  	document.addEventListener('click', () => closeMapSelect());


  	mapSelectList.addEventListener('click', (e) => e.stopPropagation());

      function getMapFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('map');
      }

      const urlMap = getMapFromUrl();

      if (urlMap && GAME_MAPS[urlMap]) {
        setMap(urlMap);
      } else {
        setMap('arcadia');
      }
});
