import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Signinform from "./Signinform";
import Register from "./Register";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signIn, setSignIn] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="rounded-md headertext px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <p>
            Hello, sign in <br></br>
            <span className="font-bold">Account & Orders</span>
          </p>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {signIn ? (
                <Signinform closeModal={closeModal} setSignIn={setSignIn} />
              ) : (
                <Register closeModal={closeModal} setSignIn={setSignIn} />
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SignIn;
