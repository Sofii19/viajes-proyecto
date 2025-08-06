import json
import time
import websocket

# Cargar coordenadas desde archivo JSON
with open('./data/coordenadas.json', 'r') as f:
    coordenadas = json.load(f)

def on_open(ws):
    print("Conectado al WebSocket desde Python")

    def run():
        i = 0
        while True:
            mensaje = json.dumps(coordenadas[i])
            try:
                ws.send(mensaje)
                print(f"Coordenada enviada: {mensaje}")
            except Exception as e:
                print(f"Error al enviar mensaje: {e}")
                break
            i = (i + 1) % len(coordenadas)  # volver al inicio al llegar al final
            time.sleep(1)

    import threading
    threading.Thread(target=run).start()  # para no bloquear el hilo principal

def on_close(ws, close_status_code, close_msg):
    print("WebSocket cerrado. Código:", close_status_code, "Mensaje:", close_msg)

def on_error(ws, error):
    print("Error en WebSocket:", error)

# Conexión permanente con reconexión automática
while True:
    try:
        ws = websocket.WebSocketApp(
            "ws://localhost:3001",
            on_open=on_open,
            on_close=on_close,
            on_error=on_error
        )
        ws.run_forever()
    except KeyboardInterrupt:
        print("Interrupción manual. Cerrando cliente.")
        break
    except Exception as e:
        print("Error fuera del WebSocket:", e)
        time.sleep(5)  # espera antes de intentar reconectar
