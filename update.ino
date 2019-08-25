#include "dht.h"
#define dht_apin A0 // Analog Pin sensor is connected to

const int buzzer = 7; //buzzer to arduino pin 9
const int trigPin = 9;
const int echoPin = 10;
long duration;
int distance;

int counter = 0;

dht DHT;
 
void setup(){
  pinMode(buzzer, OUTPUT); // Set buzzer - pin 9 as an output
  delay(500);//Delay to let system boot
  Serial.println("DHT11 Humidity & temperature Sensor\n\n");
  delay(1000);//Wait before accessing Sensor
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(9600);
 
}//end "setup()"
 
void loop(){
  //Start of Program 
 
    DHT.read11(dht_apin);
    
    Serial.print("Current humidity = ");
    Serial.print(DHT.humidity);
    Serial.print("%  ");
    Serial.print("temperature = ");
    Serial.print(DHT.temperature); 
    Serial.println("C  ");
    if(DHT.temperature > 29.0){
       while(counter <= 4){
          tone(buzzer, 1000); // Send 1KHz sound signal...
          delay(500);        // ...for 1 sec
          noTone(buzzer);     // Stop sound...
          delay(500);        // ...for 1sec
          counter = counter + 1;
       }
       counter = 0;
    }

    else{
      // Clears the trigPin
          digitalWrite(trigPin, LOW);
          delayMicroseconds(2);
     // Sets the trigPin on HIGH state for 10 micro seconds
          digitalWrite(trigPin, HIGH);
          delayMicroseconds(10);
          digitalWrite(trigPin, LOW);
    // Reads the echoPin, returns the sound wave travel time in microseconds
          duration = pulseIn(echoPin, HIGH);
    // Calculating the distance
          distance= duration*0.034/2;
     // Prints the distance on the Serial Monitor
          Serial.print("Distance: ");
          Serial.println(distance);
      if (distance < 15){
          while(counter <= 4){
          tone(buzzer, 1000); // Send 1KHz sound signal...
          delay(1000);        // ...for 1 sec
          noTone(buzzer);     // Stop sound...
          delay(1000);        // ...for 1sec
          counter = counter + 1;
         }
       counter = 0;
      }
      else if (distance < 10){
          while(counter <= 4){
          tone(buzzer, 200); // Send 1KHz sound signal...
          delay(200);        // ...for 1 sec
          noTone(buzzer);     // Stop sound...
          delay(200);        // ...for 1sec
          counter = counter + 1;
         }
       counter = 0;
      }
    }
    
    delay(3000);//Wait 5 seconds before accessing sensor again.
 
  //Fastest should be once every two seconds.
 
}// end loop() 
