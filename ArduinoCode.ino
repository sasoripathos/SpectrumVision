#include "dht.h"
#define dht_apin A0 // Analog Pin sensor is connected to

const int buzzer = 9; //buzzer to arduino pin 9
bool ring = false;
int counter = 0;
dht DHT;
 
void setup(){
  pinMode(buzzer, OUTPUT); // Set buzzer - pin 9 as an output
  Serial.begin(9600);
  delay(500);//Delay to let system boot
  Serial.println("DHT11 Humidity & temperature Sensor\n\n");
  delay(1000);//Wait before accessing Sensor
 
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
    if(DHT.temperature < 20.0){
       while(counter <= 4){
          tone(buzzer, 1000); // Send 1KHz sound signal...
          delay(1000);        // ...for 1 sec
          noTone(buzzer);     // Stop sound...
          delay(1000);        // ...for 1sec
          counter = counter + 1;
       }
    }
    
    delay(5000);//Wait 5 seconds before accessing sensor again.
 
  //Fastest should be once every two seconds.
 
}// end loop() 

