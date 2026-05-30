import Navbar from "@/components/Navbar";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="">
            <Navbar />
            <main className="relative top-13 left-0 h-full flex w-full flex-col">
                {children}
            </main>
        </div>
    )
}

export default Layout;