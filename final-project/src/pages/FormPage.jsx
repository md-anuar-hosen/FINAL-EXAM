 import { useState } from "react";
import { z } from "zod";
import Navbar from "../components/Navbar";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  age: z.string().min(1, "Age is required"),
});

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const newErrors = {};
      result.error.issues.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      setResponse(null);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Submit Information</h2>

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <div style={{ marginBottom: "15px" }}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}
            </div>

            {/* AGE */}
            <div style={{ marginBottom: "15px" }}>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
              {errors.age && (
                <p style={{ color: "red" }}>{errors.age}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#e11d48",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Submit
            </button>
          </form>

          {loading && <p style={{ marginTop: "10px" }}>Sending...</p>}

          {response && (
            <div style={{ marginTop: "20px" }}>
              <h3>Server Response</h3>
              <pre
                style={{
                  background: "#111",
                  color: "#0f0",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(response.json, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FormPage;