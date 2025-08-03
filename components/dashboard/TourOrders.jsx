"use client";

export default function TourOrders({ orderData, onOrderSelect }) {
  return (
    <div>
      <h2 className="mb-4 text-primary">Tour Orders</h2>
      <div className="card border-0 shadow">
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#3554d1" }}
        >
          <h5 className="mb-0">
            <i className="fas fa-map me-2"></i>
            All Tour Orders
          </h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="text-primary">Order ID</th>
                  <th className="text-primary">Status</th>
                  <th className="text-primary">Participants</th>
                  <th className="text-primary">Date Purchased</th>
                  <th className="text-primary">Total Price</th>
                  <th className="text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderData.orders.map((order) => (
                  <tr key={order.id} className="align-middle">
                    <td>
                      <strong className="text-primary">{order.id}</strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === "paid"
                            ? "bg-success"
                            : order.status === "pending"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <i className="fas fa-users me-1 text-muted"></i>
                      {order.participants}
                    </td>
                    <td>
                      <i className="fas fa-calendar me-1 text-muted"></i>
                      {new Date(order.datePurchased).toLocaleDateString()}
                    </td>
                    <td>
                      <strong className="text-success">
                        ${order.totalPrice}
                      </strong>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onOrderSelect(order)}
                        style={{ borderColor: "#3554d1", color: "#3554d1" }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#3554d1";
                          e.target.style.color = "white";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#3554d1";
                        }}
                      >
                        <i className="fas fa-eye me-1"></i>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
