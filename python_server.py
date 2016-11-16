
import socket
from urllib.parse import urlparse
from urllib import parse
import json
import re
import json

def getLetters(data,letter):
	letters = [0]
	for i in [m.start() for m in re.finditer(letter, data)]:
		letters.append(i)
	letters.append(len(data))
	letters.append(len(data))
	return letters

socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket.bind(('', 15555))
socket.listen(5)

while True:
	client, address = socket.accept()
	response = client.recv(1000000)
	url = response.decode('utf-8')
	response = parse.unquote(url[:-1])
	responses = response[response.find("param"):].split('&')
	objets = []
	for ele,i in zip(responses[:-1],range(len(responses)-1)):
		if i%2 == 0:
			a = ele.split('=')[1]
		else:
			b = ele.split('=')[1].replace('+',' ')
			objets.append({'image_path':a,'caption':b})
	import time
	t = time.time()
	name = 'check/'+str(t)+'.json'
	with open(name, 'w') as f:
		json.dump(objets, f)
	f.close()
	print(name)




client.close()
stock.close()