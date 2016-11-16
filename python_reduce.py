import os
import json
import collections

path = "check/"
dirs = os.listdir(path)
datas = []
for file_name in dirs:
	path_file = path+file_name
	with open(path_file, 'r') as f:
		data = json.load(f)
	for ele in data:
		datas.append(ele)

print(datas)
print(len(datas))
def reduce_data(data):
	reduced_data = collections.defaultdict(list)
	for i,j in enumerate(datas):
		if j['caption'] not in reduced_data[j['image_path']]:
			reduced_data[j['image_path']].append(j['caption'])
	return reduced_data
data = reduce_data(datas)
print(data)



