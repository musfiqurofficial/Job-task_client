import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CreatableSelect from "react-select/creatable";

export default function MyModal({ isOpen, closeModal, optionsData, editData }) {
  const [editedName, setEditedName] = useState(editData ? editData.name : "");
  const [editedOptions, setEditedOptions] = useState(
    editData ? editData.selectedOptions : []
  );
  const handleEditSubmit = async () => {
    const editedData = {
      ...editData,
      name: editedName,
      selectedOptions: editedOptions,
    };

    try {
      const response = await fetch(
        `https://job-task-server-psi.vercel.app/api/data/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        window.location.reload();
        closeModal();
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Data
                  </Dialog.Title>
                  <div className="mt-5">
                    <div className="">
                      <h6 className="mb-1">
                        Name:{" "}
                        <input
                          placeholder="Your Name"
                          required
                          type="text"
                          className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-2 focus:border-[#2684FF] focus:outline-none focus:shadow-outline"
                          id="firstName"
                          name="firstName"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </h6>
                      <p className="">
                        <span className="">Label</span>
                        <CreatableSelect
                          isClearable
                          options={optionsData}
                          value={editedOptions}
                          onChange={(selected) => setEditedOptions(selected)}
                        />
                      </p>
                      <div className="flex justify-center 2xl:justify-end items-center gap-2 mt-4">
                        <button
                          onClick={handleEditSubmit}
                          type="button"
                          className="inline-flex items-center justify-center py-2 px-10 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#2684FF] hover:bg-[#0e75fb] focus:shadow-outline focus:outline-none"
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
