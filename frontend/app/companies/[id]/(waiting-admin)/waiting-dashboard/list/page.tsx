import WaitingDashboardList from "@/components/companies/waitings/WaitingDashboardList";

export default function WaitingDashboardListPage() {
    return (
        <div className="flex flex-col sm:flex-row w-full min-h-screen p-16 overflow-y-scroll">
            <WaitingDashboardList />
        </div>
    )
}