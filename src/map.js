// 全局变量初始化
let map, heatmap, trackPolyline = null;
const pageSize = 10; // 分页每页条数
let currentPage = 1; // 当前页码
let searchResultData = []; // 检索结果缓存

// 模拟2025年6-10月外国人来华数据（包含经纬度、人数、国籍、日期）
const visitorData = [
    // 北京数据
    { lng: 116.397477, lat: 39.908692, count: 120, nationality: "日本", date: "2025-06", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 95, nationality: "美国", date: "2025-06", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 88, nationality: "欧洲", date: "2025-06", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 72, nationality: "印度", date: "2025-06", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 135, nationality: "日本", date: "2025-07", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 105, nationality: "美国", date: "2025-07", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 92, nationality: "欧洲", date: "2025-07", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 78, nationality: "印度", date: "2025-07", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 140, nationality: "日本", date: "2025-08", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 110, nationality: "美国", date: "2025-08", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 95, nationality: "欧洲", date: "2025-08", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 80, nationality: "印度", date: "2025-08", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 130, nationality: "日本", date: "2025-09", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 105, nationality: "美国", date: "2025-09", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 90, nationality: "欧洲", date: "2025-09", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 75, nationality: "印度", date: "2025-09", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 125, nationality: "日本", date: "2025-10", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 100, nationality: "美国", date: "2025-10", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 85, nationality: "欧洲", date: "2025-10", city: "北京" },
    { lng: 116.397477, lat: 39.908692, count: 70, nationality: "印度", date: "2025-10", city: "北京" },

    // 上海数据
    { lng: 121.480508, lat: 31.235923, count: 150, nationality: "日本", date: "2025-06", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 120, nationality: "美国", date: "2025-06", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 110, nationality: "欧洲", date: "2025-06", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 90, nationality: "印度", date: "2025-06", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 165, nationality: "日本", date: "2025-07", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 130, nationality: "美国", date: "2025-07", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 120, nationality: "欧洲", date: "2025-07", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 98, nationality: "印度", date: "2025-07", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 170, nationality: "日本", date: "2025-08", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 135, nationality: "美国", date: "2025-08", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 120, nationality: "欧洲", date: "2025-08", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 105, nationality: "印度", date: "2025-08", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 160, nationality: "日本", date: "2025-09", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 130, nationality: "美国", date: "2025-09", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 115, nationality: "欧洲", date: "2025-09", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 100, nationality: "印度", date: "2025-09", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 155, nationality: "日本", date: "2025-10", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 125, nationality: "美国", date: "2025-10", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 110, nationality: "欧洲", date: "2025-10", city: "上海" },
    { lng: 121.480508, lat: 31.235923, count: 95, nationality: "印度", date: "2025-10", city: "上海" },

    // 广州数据
    { lng: 113.265092, lat: 23.120049, count: 90, nationality: "日本", date: "2025-06", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 75, nationality: "美国", date: "2025-06", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 68, nationality: "欧洲", date: "2025-06", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 110, nationality: "印度", date: "2025-06", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 95, nationality: "日本", date: "2025-07", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 78, nationality: "美国", date: "2025-07", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 72, nationality: "欧洲", date: "2025-07", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 115, nationality: "印度", date: "2025-07", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 95, nationality: "日本", date: "2025-08", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 80, nationality: "美国", date: "2025-08", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 75, nationality: "欧洲", date: "2025-08", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 120, nationality: "印度", date: "2025-08", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 92, nationality: "日本", date: "2025-09", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 78, nationality: "美国", date: "2025-09", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 73, nationality: "欧洲", date: "2025-09", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 118, nationality: "印度", date: "2025-09", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 88, nationality: "日本", date: "2025-10", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 75, nationality: "美国", date: "2025-10", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 70, nationality: "欧洲", date: "2025-10", city: "广州" },
    { lng: 113.265092, lat: 23.120049, count: 115, nationality: "印度", date: "2025-10", city: "广州" },

    // 深圳数据
    { lng: 114.057868, lat: 22.543096, count: 85, nationality: "日本", date: "2025-06", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 70, nationality: "美国", date: "2025-06", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 65, nationality: "欧洲", date: "2025-06", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 105, nationality: "印度", date: "2025-06", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 90, nationality: "日本", date: "2025-07", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 73, nationality: "美国", date: "2025-07", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 68, nationality: "欧洲", date: "2025-07", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 110, nationality: "印度", date: "2025-07", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 90, nationality: "日本", date: "2025-08", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 75, nationality: "美国", date: "2025-08", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 70, nationality: "欧洲", date: "2025-08", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 115, nationality: "印度", date: "2025-08", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 88, nationality: "日本", date: "2025-09", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 73, nationality: "美国", date: "2025-09", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 68, nationality: "欧洲", date: "2025-09", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 113, nationality: "印度", date: "2025-09", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 82, nationality: "日本", date: "2025-10", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 70, nationality: "美国", date: "2025-10", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 65, nationality: "欧洲", date: "2025-10", city: "深圳" },
    { lng: 114.057868, lat: 22.543096, count: 108, nationality: "印度", date: "2025-10", city: "深圳" }
];

// 页面加载完成后初始化
window.onload = function() {
    // 初始化地图
    initMap();
    // 初始化热力图
    initHeatmap();
    // 绑定控件事件
    bindEvents();
    // 更新统计信息
    updateStatistics();
};

/**
 * 初始化高德地图
 */
function initMap() {
    // 创建地图实例（中心点设为北京，缩放级别10）
    map = new AMap.Map('map', {
        zoom: 5,
        center: [108.0, 34.0],
        viewMode: '3D',
        resizeEnable: true,
        layers: [
            new AMap.TileLayer.RoadNet() // 默认加载矢量路网图层
        ]
    });

    // 添加遥感影像图层（默认隐藏）
    const satelliteLayer = new AMap.TileLayer.Satellite({
        visible: false
    });
    map.add(satelliteLayer);

    // 存储图层到全局，用于切换
    map.satelliteLayer = satelliteLayer;
    map.vectorLayer = map.getLayers()[0]; // 矢量图层（默认第一个图层）
}

/**
 * 初始化热力图
 */
function initHeatmap() {
    // 加载热力图插件
    map.plugin(['AMap.HeatMap'], function() {
        // 创建热力图实例
        heatmap = new AMap.HeatMap(map, {
            radius: 30, // 热力图半径
            opacity: [0, 0.8], // 透明度范围
            // 热力图颜色梯度（数值越小越蓝，越大越红）
            gradient: {
                0.4: 'blue',
                0.6: 'cyan',
                0.7: 'lime',
                0.8: 'yellow',
                1.0: 'red'
            }
        });

        // 设置初始热力图数据（默认6月全量数据）
        const initialData = filterVisitorData('2025-06', 'all');
        heatmap.setDataSet({
            data: initialData,
            max: 200 // 最大权重
        });
    });
}

/**
 * 筛选访客数据（按月份和国籍）
 * @param {string} month - 月份（格式：2025-06）
 * @param {string} nationality - 国籍（all/日本/美国/欧洲/印度）
 * @returns {Array} 筛选后的数据
 */
function filterVisitorData(month, nationality) {
    return visitorData.filter(item => {
        const matchMonth = item.date === month;
        const matchNationality = nationality === 'all' || item.nationality === nationality;
        return matchMonth && matchNationality;
    });
}

/**
 * 根据国籍和月份获取流动轨迹数据
 * 从人少的城市流向人多的城市
 * @param {string} nationality - 国籍
 * @param {string} month - 月份
 * @returns {Array} 轨迹点数组
 */
function getFlowTrackData(nationality, month) {
    // 获取该国籍该月份在各城市的数据
    const cityData = visitorData.filter(item =>
        item.nationality === nationality && item.date === month
    );

    if (cityData.length === 0) {
        return [];
    }

    // 按人数排序（从少到多）
    const sortedCities = [...cityData].sort((a, b) => a.count - b.count);

    // 提取排序后的经纬度（每个城市一个点）
    const trackPoints = sortedCities.map(city => ({
        lng: city.lng,
        lat: city.lat,
        city: city.city,
        count: city.count
    }));

    return trackPoints;
}

/**
 * 绑定所有交互事件
 */
function bindEvents() {
    // 1. 地图类型切换（矢量/遥感）
    document.getElementById('vectorMapBtn').addEventListener('click', function() {
        map.vectorLayer.show();
        map.satelliteLayer.hide();
        this.classList.add('active');
        document.getElementById('satelliteMapBtn').classList.remove('active');
    });

    document.getElementById('satelliteMapBtn').addEventListener('click', function() {
        map.vectorLayer.hide();
        map.satelliteLayer.show();
        this.classList.add('active');
        document.getElementById('vectorMapBtn').classList.remove('active');
    });

    // 2. 刷新热力图（按筛选条件）
    document.getElementById('refreshHeatmapBtn').addEventListener('click', function() {
        const month = document.getElementById('monthSelect').value;
        const nationality = document.getElementById('nationalitySelect').value;
        const filteredData = filterVisitorData(month, nationality);

        // 更新热力图数据
        heatmap.setDataSet({
            data: filteredData,
            max: 200
        });
    });

    // 3. 绘制流动轨迹
    document.getElementById('drawTrackBtn').addEventListener('click', function() {
        const month = document.getElementById('trackMonth').value;
        const nationality = document.getElementById('trackNationality').value;

        if (!nationality) {
            alert('请先选择国籍！');
            return;
        }

        // 清除已有轨迹
        clearTrack();

        // 获取流动轨迹数据
        const trackPoints = getFlowTrackData(nationality, month);
        if (trackPoints.length === 0) {
            alert('暂无该国籍在该月份的轨迹数据！');
            return;
        }

        // 提取轨迹经纬度（用于绘制线）
        const path = trackPoints.map(point => [point.lng, point.lat]);

        // 绘制带箭头的轨迹线（从人少到人多）
        trackPolyline = new AMap.Polyline({
            path: path,
            strokeColor: getNationalityColor(nationality), // 按国籍设置颜色
            strokeWeight: 6, // 线宽
            strokeOpacity: 0.8, // 透明度
            strokeStyle: 'solid',
            lineJoin: 'round',
            showDir: true, // 开启方向箭头（指向终点）
            dirColor: getNationalityColor(nationality), // 箭头颜色
            dirSize: 25 // 箭头大小
        });
        map.add(trackPolyline);

        // 添加起点标记（人少 - 绿色）
        const startPoint = trackPoints[0];
        const startMarker = new AMap.Marker({
            position: [startPoint.lng, startPoint.lat],
            title: `${nationality} - 起点（人少）\n${startPoint.city}：${startPoint.count}万人`,
            icon: new AMap.Icon({
                size: new AMap.Size(30, 40),
                image: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png', // 起点图标
                imageOffset: new AMap.Pixel(-13, -30)
            })
        });
        map.add(startMarker);

        // 添加终点标记（人多 - 红色）
        const endPoint = trackPoints[trackPoints.length - 1];
        const endMarker = new AMap.Marker({
            position: [endPoint.lng, endPoint.lat],
            title: `${nationality} - 终点（人多）\n${endPoint.city}：${endPoint.count}万人`,
            icon: new AMap.Icon({
                size: new AMap.Size(30, 40),
                image: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png', // 终点图标
                imageOffset: new AMap.Pixel(-13, -30)
            })
        });
        map.add(endMarker);

        // 添加中间城市标记（蓝色）
        const middleMarkers = [];
        trackPoints.slice(1, -1).forEach((point, index) => {
            const marker = new AMap.Marker({
                position: [point.lng, point.lat],
                title: `${nationality} - 途经\n${point.city}：${point.count}万人`,
                icon: new AMap.Icon({
                    size: new AMap.Size(20, 20),
                    image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png' // 蓝色标记
                })
            });
            map.add(marker);
            middleMarkers.push(marker);
        });

        // 存储所有标记到轨迹线实例，便于后续清除
        trackPolyline.markers = [startMarker, endMarker, ...middleMarkers];

        // 显示流动说明
        alert(`轨迹说明：\n国籍：${nationality}\n月份：${month}\n流向：从${startPoint.city}（${startPoint.count}万人）→ ${endPoint.city}（${endPoint.count}万人）`);

        // 定位到轨迹范围
        map.setFitView([trackPolyline]);
    });

    // 4. 清除轨迹
    document.getElementById('clearTrackBtn').addEventListener('click', clearTrack);

    // 5. 数据查询
    document.getElementById('searchBtn').addEventListener('click', function() {
        const city = document.getElementById('cityInput').value.trim();
        const month = document.getElementById('searchMonth').value;
        const nationality = document.getElementById('dataNationality').value;

        // 筛选检索结果
        searchResultData = visitorData.filter(item => {
            const matchCity = !city || item.city === city;
            const matchMonth = !month || item.date === month;
            const matchNationality = nationality === 'all' || item.nationality === nationality;
            return matchCity && matchMonth && matchNationality;
        });

        // 重置当前页码并渲染结果
        currentPage = 1;
        renderSearchResult();
    });
}

/**
 * 清除轨迹线和标记
 */
function clearTrack() {
    if (trackPolyline) {
        // 清除轨迹线
        map.remove(trackPolyline);
        // 清除轨迹点标记
        if (trackPolyline.markers && trackPolyline.markers.length > 0) {
            map.remove(trackPolyline.markers);
        }
        trackPolyline = null;
    }
}

/**
 * 根据国籍获取颜色（用于轨迹线）
 * @param {string} nationality - 国籍
 * @returns {string} 颜色值
 */
function getNationalityColor(nationality) {
    const colorMap = {
        "日本": "#FF4500", // 橙红色
        "美国": "#1E90FF", // 道奇蓝
        "欧洲": "#32CD32", // 酸橙绿
        "印度": "#FFA500"  // 橙色
    };
    return colorMap[nationality] || "#666666"; // 默认灰色
}

/**
 * 渲染检索结果表格和分页
 */
function renderSearchResult() {
    const tableContainer = document.getElementById('searchResultTable');
    const paginationContainer = document.getElementById('pagination');

    // 1. 渲染表格
    if (searchResultData.length === 0) {
        tableContainer.innerHTML = '<p class="no-data">暂无匹配数据</p>';
        paginationContainer.innerHTML = '<span>第 1/1 页（共 0 条）</span>';
        return;
    }

    // 计算分页数据
    const totalCount = searchResultData.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    const currentPageData = searchResultData.slice(startIndex, endIndex);

    // 构建表格HTML
    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>城市</th>
                    <th>国籍</th>
                    <th>月份</th>
                    <th>人数（万人）</th>
                </tr>
            </thead>
            <tbody>
    `;

    currentPageData.forEach(item => {
        tableHtml += `
            <tr>
                <td>${item.city}</td>
                <td><span class="nationality-badge" style="background-color: ${getNationalityColor(item.nationality)}">${item.nationality}</span></td>
                <td>${item.date}</td>
                <td><strong>${item.count}</strong> </td>
            </tr>
        `;
    });

    tableHtml += `
            </tbody>
        </table>
    `;
    tableContainer.innerHTML = tableHtml;

    // 2. 渲染分页控件
    let paginationHtml = `
        <button id="prevPageBtn" class="btn" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
        <span>第 ${currentPage}/${totalPages} 页（共 ${totalCount} 条）</span>
        <button id="nextPageBtn" class="btn" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>
    `;
    paginationContainer.innerHTML = paginationHtml;

    // 绑定分页按钮事件
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderSearchResult();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                renderSearchResult();
            }
        });
    }
}

/**
 * 更新统计数据
 */
function updateStatistics() {
    // 计算总访客数
    const totalVisitors = visitorData.reduce((sum, item) => sum + item.count, 0);

    // 计算覆盖城市数量
    const uniqueCities = new Set(visitorData.map(item => item.city));

    // 计算国籍数量
    const uniqueNationalities = new Set(visitorData.map(item => item.nationality));

    // 计算月份范围
    const uniqueMonths = new Set(visitorData.map(item => item.date));

    // 更新统计显示
    document.getElementById('totalVisitors').textContent = totalVisitors.toLocaleString();
    document.getElementById('cityCount').textContent = uniqueCities.size;
    document.getElementById('nationalityCount').textContent = uniqueNationalities.size;
    document.getElementById('monthCount').textContent = uniqueMonths.size;
}

// 添加CSS样式到页面
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .nationality-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            color: white;
            font-size: 12px;
            font-weight: bold;
        }
    </style>
`);