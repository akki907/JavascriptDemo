
import { HoverEffect } from "@/components/ui/card-hover-effect";

const projects = [
    {
        title: "Event Loop Demo",
        description:
            "A mechanism that allows Node.js to perform non-blocking I/O operations, despite the fact that JavaScript is single-threaded.",
        link: "/event-demo",
    },
    {
        title: "Promises Demo",
        description:
            "An object representing the eventual completion or failure of an asynchronous operation.",
        link: "/promise-demo",
    }
];

const Dashboard = () => {
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} />
        </div>
    );
}


export default Dashboard;