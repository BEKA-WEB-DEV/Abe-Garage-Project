const conn = require("../config/db.config");

// Generate a unique vehicle ID with "VEH" prefix
const generateVehicleId = () => {
  return 'VEH' + Date.now() + Math.floor(Math.random() * 1000);
};

// Check if vehicle exists based on vehicle_serial
async function checkIfVehicleExists(vehicleData) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?";
  const rows = await conn.query(query, [vehicleData.vehicle_serial]);
  return rows.length > 0;
}

// Create a new vehicle for a customer using a custom vehicle_id
async function createVehicle(vehicleData) {
  const vehicle_id = generateVehicleId();
  const query = `
      INSERT INTO customer_vehicle_info 
        (vehicle_id, customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const result = await conn.query(query, [
    vehicle_id,
    vehicleData.customer_id,
    vehicleData.vehicle_year,
    vehicleData.vehicle_make,
    vehicleData.vehicle_model,
    vehicleData.vehicle_type,
    vehicleData.vehicle_mileage,
    vehicleData.vehicle_tag,
    vehicleData.vehicle_serial,
    vehicleData.vehicle_color,
  ]);
  if (result.affectedRows === 1) {
    return { vehicle_id };
  }
}

// Retrieve all vehicles for a customer
async function getAllVehicles(customerId) {
  const query = `
    SELECT *
    FROM customer_vehicle_info cvi
    INNER JOIN customer_identifier ci ON ci.customer_id = cvi.customer_id
    WHERE cvi.customer_id = ?`;
  const results = await conn.query(query, [customerId]);
  console.log(results);
  return results;
}

// Get vehicle by id
async function getVehicleById(vehicle_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
  const rows = await conn.query(query, [vehicle_id]);
  return rows;
}

// Delete a vehicle by its ID
async function deleteVehicle(vehicleId) {
  if (!vehicleId) {
    throw new Error("Vehicle ID must be provided");
  }
  const result = await conn.query("DELETE FROM customer_vehicle_info WHERE vehicle_id = ?", [vehicleId]);
  if (result.affectedRows === 1) return result;
}

// Edit vehicle by id
async function editVehicleById(vehicleData) {
  const {
    vehicle_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = vehicleData;
  const query = `
      UPDATE customer_vehicle_info 
      SET 
        ${vehicle_year != null ? "vehicle_year = ?," : ""}
        ${vehicle_make != null ? "vehicle_make = ?," : ""}
        ${vehicle_model != null ? "vehicle_model = ?," : ""}
        ${vehicle_type != null ? "vehicle_type = ?," : ""}
        ${vehicle_mileage != null ? "vehicle_mileage = ?," : ""}
        ${vehicle_tag != null ? "vehicle_tag = ?," : ""}
        ${vehicle_serial != null ? "vehicle_serial = ?," : ""}
        ${vehicle_color != null ? "vehicle_color = ?" : ""}
      WHERE vehicle_id = ?`;
  const queryParams = [
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
    vehicle_id,
  ].filter((param) => param !== undefined);
  const result = await conn.query(query, queryParams);
  if (result.affectedRows === 1) {
    return result;
  }
}

module.exports = {
  checkIfVehicleExists,
  createVehicle,
  getVehicleById,
  deleteVehicle,
  editVehicleById,
  getAllVehicles,
};
