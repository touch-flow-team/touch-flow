'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useParams } from "next/navigation"
import { Textarea } from "../ui/textarea"
import WaitingSettingsModal from "./WaitingSettingsModal"
import { ManagementWaitCreateParams } from "@/types/waits/types"
import { Button } from "@/components/ui/button"
import client from "@/libs/pocketbase"
import useFetchWaitSettings from "@/hooks/waits/useFetchWaitSettings"
import { waitSettingsSchema } from "@/schemata/waits/schema"

export function WaitingDashboardSettings() {
  const { toast } = useToast()
  const params = useParams()
  const [
    waitingEnabled, estimatedWaitingTime, limitPerson,
    rulesEnabled, rulesContent, manageId, userWaits, action,
    setWaitingEnabled, setRulesEnabled, setRulesContent
  ] = useFetchWaitSettings()


  const form = useForm<z.infer<typeof waitSettingsSchema>>({
    resolver: zodResolver(waitSettingsSchema),
    defaultValues: {
      waiting_enabled: false,
      rules_enabled: false
    },
  })

  function onSubmit(data: z.infer<typeof waitSettingsSchema>) {
    console.log('custom onSubmit 사용 예정');
  }
  const updateManageInfo = async (manageId: string, data: ManagementWaitCreateParams) => {
    console.log(data);

    const record = await client.collection('management_waits').update(manageId, data);

    return record
  }

  const manageData = {
    company: String(params?.id),
    waiting_enabled: waitingEnabled,
    estimated_waiting_time: estimatedWaitingTime,
    limit_persons: limitPerson,
    rules_enabled: rulesEnabled,
    rules_content: rulesContent,
    user_waits: userWaits,
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <div className="flex flex-row space-x-2 items-center">
            <h3 className="mb-4 text-[24px] font-bold">웨이팅 관련 설정</h3>
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
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="waiting_enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">웨이팅 사용 여부</FormLabel>
                    <FormDescription>웨이팅 기능 사용 여부를 체크해주세요.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={waitingEnabled}
                      onCheckedChange={() => {
                        const data = {
                          company: String(params?.id),
                          waiting_enabled: !waitingEnabled,
                          estimated_waiting_time: estimatedWaitingTime,
                          limit_persons: limitPerson,
                          rules_enabled: rulesEnabled,
                          rules_content: rulesContent,
                          user_waits: userWaits,
                        };
                        setWaitingEnabled((prev) => !prev);
                        updateManageInfo(manageId, data);
                        toast({
                          title: '변경 사항이 저장되었습니다.',
                        });
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {waitingEnabled && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row pl-1">
                  <FormLabel className="text-base">예상 대기 시간</FormLabel>
                  <div className="ml-auto flex flex-row items-center space-x-2">
                    <span className="text-black font-medium"> 팀 당 {estimatedWaitingTime} 분</span>
                    <WaitingSettingsModal
                      label={'예상 대기 시간'}
                      manageId={manageId}
                      manageData={manageData}
                      name={'estimated_waiting_time'}
                    />
                  </div>
                </div>
                <div className="flex flex-row pl-1">
                  <FormLabel className="text-base">최대 인원</FormLabel>
                  <div className="ml-auto flex flex-row items-center space-x-2">
                    <span className="text-black font-medium"> 팀 당 {limitPerson} 명</span>
                    <WaitingSettingsModal
                      label={'최대 인원'}
                      manageId={manageId}
                      manageData={manageData}
                      name="limit_persons"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="rules_enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">유의 사항 문구 설정</FormLabel>
                        <FormDescription>
                          유의 사항으로 보여줄 문구 설정 여부를 체크해주세요.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={rulesEnabled}
                          onCheckedChange={() => {
                            const data = {
                              company: String(params?.id),
                              waiting_enabled: waitingEnabled,
                              estimated_waiting_time: estimatedWaitingTime,
                              limit_persons: limitPerson,
                              rules_enabled: !rulesEnabled,
                              rules_content: rulesContent,
                              user_waits: userWaits,
                            };
                            setRulesEnabled((prev) => !prev);
                            updateManageInfo(manageId, data);
                            toast({
                              title: '변경 사항이 저장되었습니다.',
                            });
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {rulesEnabled && (
                  <div className="flex flex-col space-y-2">
                    <FormField
                      control={form.control}
                      name="rules_content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>유의 사항</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="유의 사항 문구를 직접 입력해주세요."
                              className="resize-none"
                              value={rulesContent}
                              onChange={(e) => {
                                setRulesContent(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-row">
                      <div className="w-full"></div>
                      <div className="ml-auto">
                        <Button
                          onClick={() => {
                            const data = {
                              company: String(params?.id),
                              waiting_enabled: waitingEnabled,
                              estimated_waiting_time: estimatedWaitingTime,
                              limit_persons: limitPerson,
                              rules_enabled: rulesEnabled,
                              rules_content: rulesContent,
                              user_waits: userWaits,
                            };

                            updateManageInfo(manageId, data);
                            toast({
                              title: '변경 사항이 저장되었습니다.',
                            });
                          }}>
                          문구 저장
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
