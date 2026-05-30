import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-11 shadow-xl">
            <div className="flex justify-between items-center w-full bg-primary-700 text-white py-3 px-8">
                <div className=" flex items-center gap-4 md:gap-6">
                    <Link 
                        href="/landing"
                        className="cursor-pointer hover:text-primary-700"
                        scroll={false}
                    >
                        <div className="flex items-center gap-3">
                            <Image 
                                src="/logo.svg"
                                alt="Logo of Fayhoo Haven"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <span>
                                <span className="">Fa</span>
                                <span className="text-secondary-500 font-light hover:text-primary-300">Yhoo</span>
                            </span>
                        </div>
                    </Link>
                </div>
                <p className="text-primary-200 hidden md:block">
                    Discover your perfect rental apartment with our advance search 
                </p>
                <div className="flex items-center gap-5">
                    <Link href="/sign-in">
                        <Button
                            variant="outline"
                            className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/sign-in">
                        <Button
                            variant="outline"
                            className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar;