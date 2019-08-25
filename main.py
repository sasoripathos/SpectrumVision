import cv2
import numpy as np
from utils.image_transformation import transform 
from utils.image_transformation import write_text
from utils.load_data import process_image
import pickle
from sklearn.metrics import adjusted_rand_score
from utils.predict_labels import predict_label_correlation,predict_label_svm
def Image(path):
	frame = cv2.imread(path)	
	o_frame = transform(frame)
	label = predict_label_svm(frame)
	annotated_img = write_text(frame,label)
	print(label)
	cv2.imshow('input',annotated_img)
	cv2.imshow('output',o_frame)
	cv2.waitKey(0)

def Video():
	capture = cv2.VideoCapture(0)
	while not capure.isOpened():
		capture = cv2.VideoCapture(0)
		cv2.waitKey(1000)
	label = ''
	cntr = 1
	while not False:
		flag = capture.read()
		frame = capture.read()
		if flag is not None:
                        try:
                                frame = cv2.flip(frame,1)
                                cv2.rectangle(frame,(400,100),(600,300),(255,0,0),2)
                                annotated_frame = write_text(frame,label)
                                cv2.imshow('input',annotated_frame)
                        except:
                                print('Something went wrong')
			#cv2.imshow('input',frame[100:300,400:600])
			
		else:
			cv2.waitKey(800)
		key = cv2.waitKey(5)
		if key == 27:
                        #Escape key pressed
			break
		elif key == 99 or key == ord('c'):
			#o_frame = transform(frame[100:300,400:600])
			label = predict_label_svm(frame[100:300,400:600])
			print(label)
			#cv2.imshow('output',o_frame)
		elif key == ord('s'):
			cv2.imwrite('images/'+str(cntr)+'.jpg',frame[100:300,400:600])
			cntr += 1


def test_images_correlation():
	with open('data/train.pickle', 'rb') as receive:
		train = pickle.load(receive)
	with open('data/test.pickle', 'rb') as receive:
		test = pickle.load(receive)
	for test_image in test:
		correlation={}
		best_value = 0 
		found=''
		for key in train.keys():
			acc_list = []
			for img in train[key]:
                                if img not in acc_list:
                                        acc_list = []
                                else:
                                        acc_list.append(adjusted_rand_score(img,test[test_image]))
			correlation[key]=max(acc_list)				 
			if correlation[key]>best_value:
				best_value=correlation[key]
				found = key
		print('Input: '+test_image+', Detected: '+found+' -> ' + str(test_image==found) + ' -> Confidence: ' + str(best_value))


if __name__ == "__main__":
	# test_transformation()
	# test_images_correlation()
	Video()
	cv2.destroyAllWindows()
