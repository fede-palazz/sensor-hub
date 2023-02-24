// Interface for a slave device
interface SlaveDevice {
  connectedSensors: Sensor[];
}

// Interface for an intelligent node
interface SmartNode {
  connectedSensors: Sensor[];
  connectedSlaveDevices: SlaveDevice[];
}

// Interface for a sensor
interface Sensor {
  type: SensorType;
  unit: SensorUnit;
}

// Interface for a measurement
interface Measurement {
  sensor: Sensor;
  value: number;
  timestamp: Date;
}

// Interface for a system
interface System {
  intelligentNodes: SmartNode[];
  color: string;
  name: string;
  icon: string;
}

// Enum for sensor types
enum SensorType {
  Temperature = 'temperature',
  Pressure = 'pressure',
  Humidity = 'humidity',
  Brightness = 'brightness',
  CO2 = 'co2',
}

// Enum for sensor units
enum SensorUnit {
  Celsius = '°C',
  Pascal = 'Pa',
  Percent = '%',
  Lux = 'lx',
  PartsPerMillion = 'ppm',
}

/*
enum SensorUnit {
  TEMPERATURE = "°C",
  PRESSION = "Pa",
  HUMIDITY = "%",
  BRIGHTNESS = "lx",
  CO2 = "ppm",
}
*/
