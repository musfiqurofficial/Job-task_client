import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import MyModal from "./ListBox";

const Home = () => {
  const [name, setName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [allData, setAllData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletedDataId, setDeletedDataId] = useState(null);

  const optionsData = [
    { value: "1", label: "Manufacturing" },
    { value: "19", label: "Construction materials" },
    { value: "18", label: "Electronics and Optics" },
    { value: "6", label: "Food and Beverage" },
    { value: "342", label: "Bakery & confectionery products" },
    { value: "43", label: "Beverages" },
    { value: "42", label: "Fish & fish products" },
    { value: "40", label: "Meat & meat products" },
    { value: "39", label: "Milk & dairy products" },
    { value: "437", label: "Other" },
    { value: "378", label: "Sweets & snack food" },
    { value: "13", label: "Furniture" },
    { value: "389", label: "Bathroom/sauna" },
    { value: "385", label: "Bedroom" },
    { value: "390", label: "Children’s room" },
    { value: "98", label: "Kitchen" },
    { value: "101", label: "Living room" },
    { value: "392", label: "Office" },
    { value: "394", label: "Other (Furniture)" },
    { value: "341", label: "Outdoor" },
    { value: "99", label: "Project furniture" },
    { value: "12", label: "Machinery" },
    { value: "94", label: "Machinery components" },
    { value: "91", label: "Machinery equipment/tools" },
    { value: "224", label: "Manufacture of machinery" },
    { value: "97", label: "Maritime" },
    { value: "271", label: "Aluminium and steel workboats" },
    { value: "269", label: "Boat/Yacht building" },
    { value: "230", label: "Ship repair and conversion" },
    { value: "93", label: "Metal structures" },
    { value: "508", label: "Other" },
    { value: "227", label: "Repair and maintenance service" },
    { value: "11", label: "Metalworking" },
    { value: "67", label: "Construction of metal structures" },
    { value: "263", label: "Houses and buildings" },
    { value: "267", label: "Metal products" },
    { value: "542", label: "Metal works" },
    { value: "75", label: "CNC-machining" },
    { value: "62", label: "Forgings, Fasteners" },
    { value: "69", label: "Gas, Plasma, Laser cutting" },
    { value: "66", label: "MIG, TIG, Aluminum welding" },
    { value: "9", label: "Plastic and Rubber" },
    { value: "54", label: "Packaging" },
    { value: "556", label: "Plastic goods" },
    { value: "559", label: "Plastic processing technology" },
    { value: "55", label: "Blowing" },
    { value: "57", label: "Moulding" },
    { value: "53", label: "Plastics welding and processing" },
    { value: "560", label: "Plastic profiles" },
    { value: "5", label: "Printing" },
    { value: "148", label: "Advertising" },
    { value: "150", label: "Book/Periodicals printing" },
    { value: "145", label: "Labelling and packaging printing" },
    { value: "7", label: "Textile and Clothing" },
    { value: "44", label: "Clothing" },
    { value: "45", label: "Textile" },
    { value: "8", label: "Wood" },
    { value: "337", label: "Other (Wood)" },
    { value: "51", label: "Wooden building materials" },
    { value: "47", label: "Wooden houses" },
    { value: "3", label: "Other" },
    { value: "37", label: "Creative industries" },
    { value: "29", label: "Energy technology" },
    { value: "33", label: "Environment" },
    { value: "2", label: "Service" },
    { value: "25", label: "Business services" },
    { value: "35", label: "Engineering" },
    { value: "28", label: "Information Technology and Telecommunications" },
    { value: "581", label: "Data processing, Web portals, E-marketing" },
    { value: "576", label: "Programming, Consultancy" },
    { value: "121", label: "Software, Hardware" },
    { value: "122", label: "Telecommunications" },
    { value: "22", label: "Tourism" },
    { value: "141", label: "Translation services" },
    { value: "21", label: "Transport and Logistics" },
    { value: "111", label: "Air" },
    { value: "114", label: "Rail" },
    { value: "112", label: "Road" },
    { value: "113", label: "Water" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      optionsData: selectedOptions,
      agreeTerms,
    };

    try {
      const response = await fetch("http://localhost:5001/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
      setResponseMessage("Data successfully submitted!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setResponseMessage("Error submitting data. Please try again.");
    }

    console.log(data);
  };

  const handleDelete = async (dataId) => {
    try {
      await fetch(`http://localhost:5001/api/data/${dataId}`, {
        method: "DELETE",
      });

      setDeletedDataId(dataId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/data")
      .then((res) => res.json())
      .then((data) => setAllData(data));
  }, [deletedDataId]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(data) {
    setEditData(data);
    setIsOpen(true);
  }

  return (
    <div className="lg:flex items-start py-5 md:py-16">
      <div className="relative px-4 mx-auto max-w-xl md:max-w-full lg:max-w-screen-2xl ">
        <div className="md:w-[80%] mx-auto p-10 bg-[#f7f7f7f7] shadow-md">
          <h1 className="text-[18px] mb-10 text-center">
            Please enter your name and pick the Sectors you are currently
            involved in.
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-1 sm:mb-2">
              <input
                placeholder="Your Name"
                required
                type="text"
                className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-2 focus:border-[#2684FF] focus:outline-none focus:shadow-outline"
                id="firstName"
                name="firstName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <CreatableSelect
                isClearable
                options={optionsData}
                onChange={(selected) => setSelectedOptions(selected)}
              />
            </div>
            <div className="mb-1 sm:mb-2 flex items-baseline gap-2">
              <input
                required
                type="checkbox"
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />{" "}
              <span className="font-semibold">Agree to terms</span>
            </div>

            <div className="mt-4 mb-2 sm:mb-4 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center py-2 px-10 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#2684FF] hover:bg-[#0e75fb] focus:shadow-outline focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
          {responseMessage && (
            <p className="text-center mt-4">{responseMessage}</p>
          )}
        </div>
      </div>
      <div className="my-5 lg:my-0 md:w-[80%] mx-auto px-4">
        <div className="grid md:grid-cols-2 row-gap-8 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {allData.map(({ _id, name, selectedOptions }) => (
            <div key={_id} className="shadow-md bg-[#f7f7f7f7] p-5 text-center md:text-start">
              <h6 className="mb-1">
                Name:{" "}
                <span className="font-bold font-mono text-lg">{name}</span>
              </h6>
              {selectedOptions.map(({ label }) => (
                <>
                  <p className="">
                    <span className="">{label}</span>
                  </p>
                </>
              ))}
              <div className="flex inset-0 justify-center 2xl:justify-end items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => openModal({ _id, name, selectedOptions })}
                  className="bg-green-700 hover:bg-green-800 font-mono text-white px-4 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="bg-red-700 hover:bg-red-800 font-mono text-white px-4 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MyModal
        optionsData={optionsData}
        isOpen={isOpen}
        closeModal={closeModal}
        editData={editData}
      />
    </div>
  );
};

export default Home;
