import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import { Menu, XIcon } from "lucide-react";

const navigation = [
  { name: "AI Chat", href: "/ai-chat", current: true },
  { name: "Messenger", href: "/chat", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-8 lg:px-12 shadow">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <h2 className="text-2xl font-bold text-primary">Test task</h2>
                </div>
                <div className="items-center hidden sm:flex sm:static sm:inset-auto">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      className="cursor-pointer items-center pr-2 sm:ml-6 sm:pr-0 md:block"
                      href={item.href}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {user && (
                  <div className="hidden sm:block">
                    <p className="font-medium text-lg">{user.user.email}</p>
                    <div className="flex justify-end">
                      <a className="cursor-pointer" onClick={logout}>
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={() => navigate(item.href)}
                  className={
                    "block rounded-md bg-purple-600 px-3 py-2 text-base font-medium text-white"
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
