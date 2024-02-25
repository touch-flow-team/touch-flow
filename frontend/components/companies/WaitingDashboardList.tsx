"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WaitingListCard from "./WaitingListCard"
import useFetchWaitDashboardList from "@/hooks/waits/useFetchWaitDashboardList"

const WaitingDashboardList = () => {
    const [ manageId, action, data, realData ] = useFetchWaitDashboardList()
    const progressData = data.filter((item) => item.admission_status === false)
    const completeData = data.filter((item) => item.admission_status === true)

export default WaitingDashboardList;
