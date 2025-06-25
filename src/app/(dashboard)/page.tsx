import HomeView from "@/modules/Home/ui/views/home-view";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Page = async () => {
    const session =  await auth.api.getSession({
        headers: await headers(),
    });

    if(!session)  {
        redirect("/sign-in")
    }
    return (
        // <HomeView/>
        <div>
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            <p className="mt-4">This is a placeholder for the dashboard content.</p>
        </div>
    ) 
}

export default Page;