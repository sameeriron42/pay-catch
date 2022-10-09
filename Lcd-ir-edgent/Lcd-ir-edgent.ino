
// Fill-in information from your Blynk Template here
//#define BLYNK_TEMPLATE_ID           "TMPLxxxxxx"
//#define BLYNK_DEVICE_NAME           "Device"
#define BLYNK_TEMPLATE_ID "TMPL7XQ5SdIz"
#define BLYNK_DEVICE_NAME "blink led"
#define BLYNK_AUTH_TOKEN "K8VHXHcD5E3ds97FU_AGYIX8I-QwwmRZ"
#define BLYNK_FIRMWARE_VERSION        "0.1.0"

#define BLYNK_PRINT Serial
//#define BLYNK_DEBUG

#define APP_DEBUG
int val = -1;
int irPin = 14;
char auth[] = BLYNK_AUTH_TOKEN;

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "Redmi K20 Pro";
char pass[] = "12345678sa";

// Uncomment your board, or configure a custom board in Settings.h
//#define USE_SPARKFUN_BLYNK_BOARD
//#define USE_NODE_MCU_BOARD
//#define USE_WITTY_CLOUD_BOARD
//#define USE_WEMOS_D1_MINI

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

BLYNK_WRITE(V0)
{
  if (param.asInt() == 1)
  {
    lcd.setCursor(0, 0);
    lcd.print("      ON          ");
  }
  else
  {
    lcd.setCursor(0, 0);
    lcd.print("       OFF         ");
  }

}
BLYNK_WRITE(V3)
{
  float amount = param.asFloat();
  amount /=100;
  lcd.setCursor(0,0);
  lcd.print("AMOUNT:");
  lcd.print(amount);
}
BLYNK_CONNECTED()
{
  Blynk.syncVirtual(V0);
  Blynk.syncVirtual(V3);

}
void setup()
{
  Serial.begin(115200);
  delay(100);
  pinMode(irPin, INPUT);
  Blynk.begin(auth,ssid,pass,"blynk.cloud",80);
  Serial.print("blynk connected");
  lcd.begin();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print(" BALLS ");
  Serial.print("printed");
}

void loop() {
  Blynk.run();

}
