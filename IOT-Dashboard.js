<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌱 EcoFarm IoT Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            color: white;
        }

        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        .card-icon {
            font-size: 3em;
            margin-bottom: 15px;
            display: block;
        }

        .card-title {
            font-size: 1.3em;
            margin-bottom: 15px;
            color: #555;
            font-weight: 600;
        }

        .card-value {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .temperature { color: #e74c3c; }
        .humidity { color: #3498db; }
        .relay-on { color: #27ae60; }
        .relay-off { color: #95a5a6; }
        .online { color: #27ae60; }
        .offline { color: #e74c3c; }

        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }

        .status-online { background: #27ae60; }
        .status-offline { background: #e74c3c; }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .info-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            text-align: center;
        }

        .info-card h4 {
            color: #666;
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        .info-card .value {
            font-size: 1.4em;
            font-weight: bold;
            color: #333;
        }

        .controls {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        .btn {
            background: linear-gradient(45deg, #3498db, #2980b9);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1.1em;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 10px;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        .chart-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .chart {
            width: 100%;
            height: 300px;
            position: relative;
            border: 2px solid #ecf0f1;
            border-radius: 10px;
            background: #f8f9fa;
        }

        .chart-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #666;
        }

        .chart-canvas {
            width: 100%;
            height: 100%;
        }

        .footer {
            text-align: center;
            color: rgba(255,255,255,0.8);
            margin-top: 30px;
            font-size: 0.9em;
        }

        .connection-status {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.9);
            padding: 10px 20px;
            border-radius: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .alert {
            background: #f39c12;
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
            display: none;
        }

        .alert.show {
            display: block;
            animation: slideDown 0.3s ease;
        }

        .alert.error {
            background: #e74c3c;
        }

        .alert.success {
            background: #27ae60;
        }

        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .loading {
            opacity: 0.6;
            pointer-events: none;
        }

        .data-history {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .history-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .history-item:last-child {
            border-bottom: none;
        }

        @media (max-width: 768px) {
            .header h1 { font-size: 2em; }
            .card-value { font-size: 2em; }
            .dashboard-grid { grid-template-columns: 1fr; }
            .info-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
            .btn { margin: 5px; }
        }
    </style>
</head>
<body>
    <div class="connection-status">
        <span class="status-indicator" id="connection-indicator"></span>
        <span id="connection-text">Connecting...</span>
    </div>

    <div class="container">
        <div class="header">
            <h1>🌱 EcoFarm IoT Dashboard</h1>
            <p>Real-time Environmental Monitoring System</p>
        </div>

        <div class="alert" id="alert">
            <strong id="alert-icon">⚠️</strong> <span id="alert-message"></span>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <span class="card-icon">🌡️</span>
                <div class="card-title">Temperature</div>
                <div class="card-value temperature" id="temperature">--°C</div>
                <div>Target: 30-32°C</div>
            </div>

            <div class="card">
                <span class="card-icon">💧</span>
                <div class="card-title">Humidity</div>
                <div class="card-value humidity" id="humidity">--%</div>
                <div>Optimal: 60-70%</div>
            </div>

            <div class="card">
                <span class="card-icon">🌀</span>
                <div class="card-title">Exhaust Fan</div>
                <div class="card-value" id="relay">--</div>
                <div id="relay-status">Automatic Control</div>
            </div>

            <div class="card">
                <span class="card-icon">📡</span>
                <div class="card-title">System Status</div>
                <div class="card-value" id="status">
                    <span class="status-indicator" id="status-indicator"></span>
                    <span id="status-text">--</span>
                </div>
                <div id="last-seen">Last update: --</div>
            </div>
        </div>

        <div class="info-grid">
            <div class="info-card">
                <h4>📶 WiFi Signal</h4>
                <div class="value" id="wifi-signal">-- dBm</div>
            </div>
            <div class="info-card">
                <h4>🆔 Node ID</h4>
                <div class="value" id="node-id">ESP32_01</div>
            </div>
            <div class="info-card">
                <h4>💾 Free Memory</h4>
                <div class="value" id="free-heap">-- KB</div>
            </div>
            <div class="info-card">
                <h4>⏱️ Uptime</h4>
                <div class="value" id="uptime">--</div>
            </div>
        </div>

        <div class="controls">
            <h3 style="margin-bottom: 20px; color: #555;">Dashboard Controls</h3>
            <button class="btn" onclick="refreshData()">🔄 Refresh Now</button>
            <button class="btn" onclick="toggleAutoRefresh()">⏯️ Auto Refresh: <span id="auto-status">ON</span></button>
            <button class="btn" onclick="exportData()">📊 Export Data</button>
            <button class="btn" onclick="clearHistory()">🗑️ Clear History</button>
        </div>

        <div class="chart-container">
            <h3 style="margin-bottom: 20px; color: #555;">📈 Temperature & Humidity Trends (Last 20 readings)</h3>
            <div class="chart">
                <canvas id="chart-canvas" class="chart-canvas"></canvas>
                <div class="chart-content" id="chart-placeholder">
                    <div>📊 Loading chart data...<br>Real-time readings will appear here</div>
                </div>
            </div>
        </div>

        <div class="data-history">
            <h3 style="margin-bottom: 20px; color: #555;">📋 Recent Data History</h3>
            <div id="history-list">
                <div style="text-align: center; color: #666;">No data history available</div>
            </div>
        </div>

        <div class="footer">
            <p>© 2024 EcoFarm IoT System | Last Updated: <span id="last-update">--</span></p>
            <p>ESP32 Gateway: <span id="gateway-ip">192.168.1.100:8080</span> | Auto-refresh: <span id="refresh-interval">5s</span></p>
        </div>
    </div>

    <script>
        // Configuration
        const ESP32_GATEWAY_IP = '192.168.1.100:8080'; // Ganti dengan IP ESP32 Gateway Anda
        const API_ENDPOINT = `http://${ESP32_GATEWAY_IP}/api/data`;
        
        let autoRefresh = true;
        let refreshInterval = 5000; // 5 seconds
        let refreshTimer;
        let lastDataTime = 0;

        // Data history for charts and display
        let dataHistory = {
            temperature: [],
            humidity: [],
            timestamps: [],
            readings: []
        };

        let chart = null;
        let maxHistoryItems = 20;

        function updateConnectionStatus(connected) {
            const indicator = document.getElementById('connection-indicator');
            const text = document.getElementById('connection-text');
            
            if (connected) {
                indicator.className = 'status-indicator status-online';
                text.textContent = 'Connected';
            } else {
                indicator.className = 'status-indicator status-offline';
                text.textContent = 'Disconnected';
            }
        }

        function showAlert(message, type = 'warning') {
            const alert = document.getElementById('alert');
            const alertMessage = document.getElementById('alert-message');
            const alertIcon = document.getElementById('alert-icon');
            
            // Set icon based on type
            switch(type) {
                case 'success':
                    alertIcon.textContent = '✅';
                    alert.className = 'alert success show';
                    break;
                case 'error':
                    alertIcon.textContent = '❌';
                    alert.className = 'alert error show';
                    break;
                default:
                    alertIcon.textContent = '⚠️';
                    alert.className = 'alert show';
            }
            
            alertMessage.textContent = message;
            
            setTimeout(() => {
                alert.classList.remove('show');
            }, 5000);
        }

        function addToHistory(data) {
            const now = new Date();
            const reading = {
                timestamp: now,
                temperature: data.temperature,
                humidity: data.humidity,
                relayStatus: data.relayStatus,
                online: data.online
            };

            dataHistory.readings.unshift(reading);
            dataHistory.temperature.unshift(data.temperature);
            dataHistory.humidity.unshift(data.humidity);
            dataHistory.timestamps.unshift(now.toLocaleTimeString());

            // Keep only last N items
            if (dataHistory.readings.length > maxHistoryItems) {
                dataHistory.readings = dataHistory.readings.slice(0, maxHistoryItems);
                dataHistory.temperature = dataHistory.temperature.slice(0, maxHistoryItems);
                dataHistory.humidity = dataHistory.humidity.slice(0, maxHistoryItems);
                dataHistory.timestamps = dataHistory.timestamps.slice(0, maxHistoryItems);
            }

            updateHistoryDisplay();
            updateChart();
        }

        function updateHistoryDisplay() {
            const historyList = document.getElementById('history-list');
            
            if (dataHistory.readings.length === 0) {
                historyList.innerHTML = '<div style="text-align: center; color: #666;">No data history available</div>';
                return;
            }

            let html = '';
            dataHistory.readings.slice(0, 10).forEach(reading => {
                html += `
                    <div class="history-item">
                        <div>
                            <strong>${reading.timestamp.toLocaleTimeString()}</strong><br>
                            <small>${reading.timestamp.toLocaleDateString()}</small>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: #e74c3c; font-weight: bold;">${reading.temperature.toFixed(1)}°C</div>
                            <div style="color: #3498db; font-weight: bold;">${reading.humidity.toFixed(1)}%</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: ${reading.relayStatus ? '#27ae60' : '#95a5a6'}; font-weight: bold;">
                                Fan: ${reading.relayStatus ? 'ON' : 'OFF'}
                            </div>
                            <div style="color: ${reading.online ? '#27ae60' : '#e74c3c'}; font-size: 0.9em;">
                                ${reading.online ? 'Online' : 'Offline'}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            historyList.innerHTML = html;
        }

        function updateChart() {
            const canvas = document.getElementById('chart-canvas');
            const placeholder = document.getElementById('chart-placeholder');
            
            if (dataHistory.temperature.length < 2) {
                placeholder.style.display = 'block';
                canvas.style.display = 'none';
                return;
            }

            placeholder.style.display = 'none';
            canvas.style.display = 'block';

            const ctx = canvas.getContext('2d');
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            if (dataHistory.temperature.length < 2) return;

            // Draw grid
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            
            for (let i = 0; i <= 10; i++) {
                const y = (height / 10) * i;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw temperature line
            const tempData = dataHistory.temperature.slice().reverse();
            const humData = dataHistory.humidity.slice().reverse();
            
            // Temperature (scale: 20-40°C)
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            for (let i = 0; i < tempData.length; i++) {
                const x = (width / (tempData.length - 1)) * i;
                const y = height - ((tempData[i] - 20) / 20) * height;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Humidity line (scale: 0-100%)
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            for (let i = 0; i < humData.length; i++) {
                const x = (width / (humData.length - 1)) * i;
                const y = height - (humData[i] / 100) * height;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Draw legend
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(10, 10, 20, 3);
            ctx.fillStyle = '#333';
            ctx.font = '12px sans-serif';
            ctx.fillText('Temperature (°C)', 35, 20);

            ctx.fillStyle = '#3498db';
            ctx.fillRect(10, 25, 20, 3);
            ctx.fillText('Humidity (%)', 35, 35);
        }

        async function loadData() {
            document.body.classList.add('loading');
            
            try {
                const response = await fetch(API_ENDPOINT);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const data = await response.json();
                
                // Update display
                document.getElementById('temperature').textContent = data.temperature.toFixed(1) + '°C';
                document.getElementById('humidity').textContent = data.humidity.toFixed(1) + '%';
                
                const relayElement = document.getElementById('relay');
                relayElement.textContent = data.relayStatus ? 'ON' : 'OFF';
                relayElement.className = 'card-value ' + (data.relayStatus ? 'relay-on' : 'relay-off');
                
                const statusElement = document.getElementById('status-text');
                const statusIndicator = document.getElementById('status-indicator');
                statusElement.textContent = data.online ? 'ONLINE' : 'OFFLINE';
                statusElement.className = data.online ? 'online' : 'offline';
                statusIndicator.className = 'status-indicator ' + (data.online ? 'status-online' : 'status-offline');
                
                document.getElementById('wifi-signal').textContent = data.wifiSignal + ' dBm';
                document.getElementById('free-heap').textContent = Math.round((data.freeHeap || 0) / 1024) + ' KB';
                document.getElementById('last-seen').textContent = `Last update: ${data.lastUpdate || 0}s ago`;
                document.getElementById('uptime').textContent = formatUptime(data.lastUpdate || 0);
                
                // Update connection status
                updateConnectionStatus(data.online);
                
                // Add to history
                addToHistory(data);
                
                // Update footer
                document.getElementById('last-update').textContent = new Date().toLocaleString();
                document.getElementById('gateway-ip').textContent = ESP32_GATEWAY_IP;
                
                // Clear any error messages
                if (data.online && lastDataTime === 0) {
                    showAlert('Successfully connected to EcoFarm system!', 'success');
                }
                
                lastDataTime = Date.now();
                
            } catch (error) {
                console.error('Error loading data:', error);
                updateConnectionStatus(false);
                
                // Update status display
                document.getElementById('status-text').textContent = 'ERROR';
                document.getElementById('status-text').className = 'offline';
                document.getElementById('status-indicator').className = 'status-indicator status-offline';
                
                if (Date.now() - lastDataTime > 30000) { // Show error if no data for 30 seconds
                    showAlert(`Connection error: ${error.message}. Check ESP32 Gateway at ${ESP32_GATEWAY_IP}`, 'error');
                }
            } finally {
                document.body.classList.remove('loading');
            }
        }

        function formatUptime(seconds) {
            if (seconds < 60) return `${seconds}s`;
            if (seconds < 3600) return `${Math.floor(seconds/60)}m ${seconds%60}s`;
            const hours = Math.floor(seconds/3600);
            const minutes = Math.floor((seconds%3600)/60);
            return `${hours}h ${minutes}m`;
        }

        function refreshData() {
            showAlert('Refreshing data...', 'success');
            loadData();
        }

        function toggleAutoRefresh() {
            autoRefresh = !autoRefresh;
            const statusElement = document.getElementById('auto-status');
            statusElement.textContent = autoRefresh ? 'ON' : 'OFF';
            
            if (autoRefresh) {
                startAutoRefresh();
                showAlert('Auto-refresh enabled', 'success');
            } else {
                clearInterval(refreshTimer);
                showAlert('Auto-refresh disabled', 'warning');
            }
        }

        function exportData() {
            if (dataHistory.readings.length === 0) {
                showAlert('No data to export', 'warning');
                return;
            }

            const csvContent = "data:text/csv;charset=utf-8," 
                + "Timestamp,Temperature(°C),Humidity(%),Fan Status,System Status\n"
                + dataHistory.readings.map(reading => 
                    `${reading.timestamp.toISOString()},${reading.temperature},${reading.humidity},${reading.relayStatus ? 'ON' : 'OFF'},${reading.online ? 'Online' : 'Offline'}`
                ).join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `ecofarm_data_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showAlert('Data exported successfully!', 'success');
        }

        function clearHistory() {
            if (confirm('Are you sure you want to clear all data history?')) {
                dataHistory = {
                    temperature: [],
                    humidity: [],
                    timestamps: [],
                    readings: []
                };
                updateHistoryDisplay();
                updateChart();
                showAlert('Data history cleared', 'success');
            }
        }

        function startAutoRefresh() {
            if (refreshTimer) clearInterval(refreshTimer);
            refreshTimer = setInterval(loadData, refreshInterval);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            loadData();
            startAutoRefresh();
            
            // Resize chart when window resizes
            window.addEventListener('resize', function() {
                setTimeout(updateChart, 100);
            });
        });

        // Handle visibility change (pause when tab not active)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(refreshTimer);
            } else if (autoRefresh) {
                startAutoRefresh();
                loadData(); // Refresh immediately when tab becomes active
            }
        });
    </script>
</body>
</html>
