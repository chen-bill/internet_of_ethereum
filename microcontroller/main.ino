int lock = A4;
int led = D0;

void setup()
{
  pinMode(lock, OUTPUT);
  pinMode(led, OUTPUT);

  Particle.function("lock",ledToggle);
  
  analogWrite(lock, 0);
  digitalWrite(led, LOW);
}

void loop()
{
}

int ledToggle(String command) {
  if (command=="true") {
    analogWrite(lock,254);
    digitalWrite(led, HIGH);
    return 1;
  }
  else if (command=="false") {
    analogWrite(lock,1);
    digitalWrite(led, LOW);
    return 0;
  }
  else {
    return -1;
  }
}

