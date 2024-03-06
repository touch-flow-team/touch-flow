import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import client from "@/libs/pocketbase"
import { WaitingListCardProps } from "@/types/waits/types"
import twilioClient from "@/libs/twilio";
import GetCompanyInfo from "@/server-actions/waits/GetCompanyInfo";
import { useParams } from "next/navigation";
import CallUser from "@/server-actions/waits/CallUser";

const WaitingListCard = ({
  id,
  user_phone_number,
  adult_persons,
  child_persons,
  created,
  admission_status,
}: WaitingListCardProps) => {
  const params = useParams()
  const handleOnclick = async () => {
    if (!admission_status) {
      const data = {
        user_phone_number,
        admission_status: true,
        adult_persons,
        child_persons,
      };

      await client.collection('user_waits').update(id, data);
    }
  };

  const handleClickCall = async () => {
    const response = await CallUser({ companyId: String(params?.id), user_phone_number })

    if (response.status === 200) {
      const data = {
        user_phone_number,
        admission_status: true,
        adult_persons,
        child_persons,
      };

      await client.collection('user_waits').update(id, data);
      
      alert('호출 문자가 정상적으로 전달 되었습니다.')
    } else {
      alert('호출 문자가 전송되지 못했습니다. 새로고침 후 다시 시도 해주세요.')
    }
  }

  // 출력 포맷 설정
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = created?.toLocaleString('en-US', options);

  const formattedPhoneNumber = user_phone_number?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  return (
    <Card className="p-8">
      <CardHeader className="mb-2">
        <CardTitle>{formattedPhoneNumber}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex space-x-2">
            <span>어른: {adult_persons} 명</span>
            <span>어린이: {child_persons} 명</span>
          </div>
          <div>
            <span>웨이팅 등록 시간: {formattedDate}</span>
          </div>
        </div>
        {!admission_status && (
          <div className="flex flex-row space-x-2 ml-auto">
            <Button onClick={handleClickCall} variant="secondary">고객 호출</Button>
            <Button onClick={handleOnclick} variant="default">
              입장
            </Button>
            <Button onClick={handleOnclick} variant="destructive">
              미입장
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WaitingListCard;
