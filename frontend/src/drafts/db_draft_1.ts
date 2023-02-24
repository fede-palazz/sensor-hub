interface System_1 {
  id: string;
  name: string;
  color: string;
  icon: string;
  nodes: SmartNode_1[];
}

interface SmartNode_1 {
  id: string;
  sensors: Sensor_1[];
  measurements: Measurement[];
}

interface Sensor_1 {
  id: string;
  type: SensorType;
  unit: SensorUnit;
}

enum SensorType_1 {
  Temperature = 'temperature',
  Pressure = 'pressure',
  Humidity = 'humidity',
  Brightness = 'brightness',
  CO2 = 'CO2',
}

enum SensorUnit_1 {
  Celsius = '°C',
  Fahrenheit = '°F',
  Kelvin = 'K',
  Hectopascal = 'hPa',
  Percent = '%',
  PartsPerMillion = 'ppm',
  Lux = 'lux',
}

interface Measurement_1 {
  timestamp: Date;
  values: [
    {
      sensorId: string;
      measurement: number;
    }
  ];
}
