"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WaitingListCard from "./WaitingListCard"
import useFetchWaitDashboardList from "@/hooks/waits/useFetchWaitDashboardList"

const WaitingDashboardList = () => {
    const [ manageId, action, data, realData ] = useFetchWaitDashboardList()
    const progressData = data?.filter((item) => item.admission_status === false)
    const completeData = data?.filter((item) => item.admission_status === true)

    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-row space-x-2 items-center">
          <h3 className="mb-4 text-[24px] font-bold">웨이팅 목록</h3>
          <button onClick={() => window.location.reload()} className="flex mb-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 489.533 489.533">
                <g>
                  <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z" />
                </g>
              </svg>
            </div>
          </button>
        </div>
        <Tabs defaultValue="대기" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="대기">
              대기
            </TabsTrigger>
            <TabsTrigger className="w-full" value="완료">
              완료
            </TabsTrigger>
          </TabsList>
          <TabsContent value="대기">
            <div className="flex flex-col space-y-4">
              {action != ''
                ? realData
                    ?.filter((item) => item.admission_status === false)
                    ?.map((item) => {
                      return (
                        <WaitingListCard
                          key={item.user_phone_number}
                          id={item.id}
                          user_phone_number={item.user_phone_number}
                          adult_persons={item.adult_persons}
                          child_persons={item.child_persons}
                          created={item.created}
                          admission_status={item.admission_status}
                        />
                      );
                    })
                : progressData?.map((item) => {
                    return (
                      <WaitingListCard
                        key={item.user_phone_number}
                        id={item.id}
                        user_phone_number={item.user_phone_number}
                        adult_persons={item.adult_persons}
                        child_persons={item.child_persons}
                        created={item.created}
                        admission_status={item.admission_status}
                      />
                    );
                  })}
            </div>
          </TabsContent>
          <TabsContent value="완료">
            <div className="flex flex-col space-y-4">
              {action != ''
                ? realData
                    ?.filter((item) => item.admission_status === true)
                    ?.map((item) => {
                      return (
                        <WaitingListCard
                          key={item.user_phone_number}
                          id={item.id}
                          user_phone_number={item.user_phone_number}
                          adult_persons={item.adult_persons}
                          child_persons={item.child_persons}
                          created={item.created}
                          admission_status={item.admission_status}
                        />
                      );
                    })
                : completeData?.map((item) => {
                    return (
                      <WaitingListCard
                        key={item.user_phone_number}
                        id={item.id}
                        user_phone_number={item.user_phone_number}
                        adult_persons={item.adult_persons}
                        child_persons={item.child_persons}
                        created={item.created}
                        admission_status={item.admission_status}
                      />
                    );
                  })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
}
export default WaitingDashboardList;
