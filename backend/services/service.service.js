const conn = require("../config/db.config");

// Generate a unique service ID with "SER" prefix
const generateServiceId = () => {
  return 'SER' + Date.now() + Math.floor(Math.random() * 1000);
};

const getExistingServiceNames = async () => {
  const query = "SELECT service_name FROM common_services";
  const rows = await conn.query(query);
  return rows.map((row) => row.service_name);
};

const createServices = async () => {
  const existingServiceNames = await getExistingServiceNames();
  const newServices = [
    {
      name: "Oil change",
      description:
        "Every 5,000 kilometers or so, you need to change the oil in your car to keep your engine in the best possible shape.",
      price: "30.25",
    },
    {
      name: "Spark Plug replacement",
      description:
        "Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.",
      price: "43",
    },
    {
      name: "Fuel Cap tightening",
      description:
        "Loose fuel caps are actually a main reason why the 'check engine' light in a car comes on.",
      price: "12",
    },
    {
      name: "Oxygen Sensor replacement",
      description:
        "Oxygen sensors measure the concentration of oxygen in the exhaust gases to optimize engine performance and emissions.",
      price: "39.5",
    },
    {
      name: "Brake Work",
      description:
        "Brake work is critical – a failure to stop properly is one cause of many accidents.",
      price: "25",
    },
    {
      name: "Tire repairs and changes",
      description:
        "Patch a leak or replace worn tires to maintain speed, control, and fuel efficiency.",
      price: "55",
    },
    {
      name: "The ignition system",
      description:
        "A car's ignition system includes its battery, starter, and ignition components.",
      price: "45.5",
    },
    {
      name: "Programming the camera software",
      description:
        "Enhance vehicle capabilities and security with updated camera software.",
      price: "30",
    },
  ];

  const servicesToInsert = newServices.filter((newService) => {
    return !existingServiceNames.includes(newService.name);
  });

  if (servicesToInsert.length === 0) {
    console.log("All services already exist in the database.");
    return;
  }

  // For each new service, generate a service_id with "SER" prefix
  const values = servicesToInsert
    .map(
      (service) =>
        `('${generateServiceId()}', '${service.name}', '${service.description}', '${service.price}')`
    )
    .join(", ");

  const query = `INSERT INTO common_services (service_id, service_name, service_description, service_price) VALUES ${values}`;
  const rows = await conn.query(query);
  return rows;
};

async function addService(service) {
  const checkquery = "SELECT service_name FROM common_services WHERE service_name = ?";
  const [check] = await conn.query(checkquery, [service.service_name]);
  if (check) {
    return;
  }
  // Generate a unique service_id
  const service_id = generateServiceId();
  const query =
    "INSERT INTO common_services (service_id, service_name, service_description, service_price) VALUES (?, ?, ?, ?)";
  const rows = await conn.query(query, [
    service_id,
    service.service_name,
    service.service_description,
    service.service_price,
  ]);
  return rows;
}

const getSingleService = async (service_id) => {
  const query = "SELECT * FROM common_services WHERE service_id = ?";
  const row = await conn.query(query, [service_id]);
  return row;
};

const editService = async (service) => {
  let updatedService = {};
  if (
    service.service_name ||
    service.service_description ||
    service.service_price
  ) {
    const serviceQuery = `
        UPDATE common_services
        SET 
          ${service.service_name ? "service_name = ?," : ""}
          ${service.service_description ? "service_description = ?," : ""}
          ${service.service_price ? "service_price = ?" : ""}
        WHERE service_id = ?`;
    const queryParams = [
      service.service_name,
      service.service_description,
      service.service_price,
      service.service_id,
    ].filter((param) => param !== undefined && param !== "");
    const rows = await conn.query(serviceQuery, queryParams);
    if (rows) {
      updatedService = {
        service_name: service.service_name,
        service_description: service.service_description,
        service_price: service.service_price,
      };
    }
  }
  return updatedService;
};

async function deleteService(serviceId) {
  const query = "DELETE FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [serviceId]);
  return true;
}

async function getAllServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);
  return rows;
}

module.exports = {
  createServices,
  addService,
  getSingleService,
  editService,
  deleteService,
  getAllServices,
};
