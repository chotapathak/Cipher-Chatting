# main modules
import socket
import threading

HOST = '127.0.0.1'
PORT = 8545

# Main Function
def main():
# creating the socket class object
# AF_INET: IT is for IP Addresses
# SOCK_STREAM: It is  TCP Packet for communication
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try: 
        # Providing Server
        server.bind((HOST, PORT))
    except:
        print('Unable to bind the host {HOST} and port {PORT}')

    # setting Server

if __name__ == '__main__':
    main()