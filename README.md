# Image-Annotation-Website-for-Deep-Learning-Project

# How to use .
1. You need to launch local server (as Mamp) in order to have acces to the index.html page.
2. Put the images you want to annotate in the /imgs folder
3. Launch the python server : python python_server.py
4. On the website page,
	- previous: allow to change the previous caption
	- next: allow to access a random image of the /imgs folder
	- final : submit the local storage , json data with image_path and caption associated
5. The python_server.py code will save a .json file in /checks folder
6. The python_reduce code allow to make a map-reduce on image path , associating one path to several captions (may be useful if several people use this website)
7 . It is done. 