// 1. ใส่ Access Token จากไฟล์เดิมของคุณ
mapboxgl.accessToken = 'pk.eyJ1IjoidGVzdHNtdGgiLCJhIjoiY21uMnltOHFsMWJsajJ3cTVnMHg1ZzRvdSJ9.7mnu46_XNxNp_v22_N67zA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/testsmth/cmncy7s1r002q01s82gvv13jd', 
    center: [100.5, 13.7],
    zoom: 5,
    projection: 'mercator'
});

map.on('load', () => {
    // ----- ส่วนที่ 1: ข้อมูลลุ่มน้ำ (เดิม) -----
    map.addSource('watershed-source', {
        type: 'vector',
        url: 'mapbox://testsmth.8h8bayf2'
    });

    map.addLayer({
        id: 'watershed-layer',
        type: 'fill',
        source: 'watershed-source',
        'source-layer': '8h8bayf2', // ตรวจสอบชื่อ layer ใน Studio อีกครั้ง
        paint: {
            'fill-color': '#3498db',
            'fill-opacity': 0.4,
            'fill-outline-color': '#ffffff'
        }
    });

    // ----- ส่วนที่ 2: เส้นขอบเขตดินแดน (ใหม่จาก Shapefile) -----
    map.addSource('boundary-source', {
        type: 'vector',
        url: 'mapbox://testsmth.6qeam72z' // ลิงก์ใหม่ที่คุณส่งมา
    });

    map.addLayer({
        id: 'boundary-layer',
        type: 'line',
        source: 'boundary-source',
        'source-layer': 'ne_10m_admin_0_boundary_lines_land', // ชื่อ layer ปกติจะตามชื่อไฟล์ที่อัปโหลด
        paint: {
            'line-color': '#e67e22', // สีส้มอิฐเพื่อให้เห็นชัดบนแผนที่
            'line-width': 1.5,
            'line-dasharray': [2, 1] // ทำให้เป็นเส้นประเพื่อความสวยงาม
        }
    });
});

// ระบบเปิด-ปิด Layer (เชื่อมกับ Checkbox ใน index.html)
document.getElementById('layer-watershed')?.addEventListener('change', (e) => {
    map.setLayoutProperty('watershed-layer', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('layer-boundary')?.addEventListener('change', (e) => {
    map.setLayoutProperty('boundary-layer', 'visibility', e.target.checked ? 'visible' : 'none');
});


// แสดงพิกัดขณะขยับเมาส์
map.on('mousemove', (e) => {
    document.querySelector('.coords').innerHTML = 
        `Lat: ${e.lngLat.lat.toFixed(4)}, Lon: ${e.lngLat.lng.toFixed(4)}`;
});

document.getElementById('layer-boundary').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'boundary-layer',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    );
});