import json
import time
import websocket

# Cargar coordenadas desde archivo JSON
with open('./data/coordenadas.json', 'r') as f:
    coordenadas = json.load(f)

# Conectarse al servidor WebSocket
def on_open(ws):
    print("Conectado al WebSocket desde Python")
    i = 0

    def run():
        nonlocal i
        while i < len(coordenadas):
            mensaje = json.dumps(coordenadas[i])
            ws.send(mensaje)
            print(f"Coordenada enviada: {mensaje}")
            i += 1
            time.sleep(1)
    run()

# Crear conexión WebSocket
ws = websocket.WebSocketApp("ws://localhost:3001", on_open=on_open)

ws.run_forever()
