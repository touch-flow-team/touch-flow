import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PocketBase from 'pocketbase'

export interface WaitingListCardProps {
    id: string
    user_phone_number: string
    adult_persons: number
    child_persons: number
    created: Date
    admission_status: boolean
}

const WaitingListCard = ({ id, user_phone_number, adult_persons, child_persons, created, admission_status }: WaitingListCardProps) => {
    const pb = new PocketBase('http://127.0.0.1:8090')

    const handleOnclick = async () => {
        if (!admission_status) {
            const data = {
                user_phone_number,
                admission_status: true,
                adult_persons,
                child_persons
            }

            await pb.collection('user_waits').update(id, data)
        }
    }

    // 출력 포맷 설정
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", hour: "numeric", minute: "numeric" };
    const formattedDate = created?.toLocaleString("en-US", options);

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
                {
                    !admission_status && (
                        <div className="flex flex-row space-x-2 ml-auto">
                            <Button variant="secondary">고객 호출</Button>
                            <Button onClick={handleOnclick} variant="default">입장</Button>
                            <Button onClick={handleOnclick} variant="destructive">미입장</Button>
                        </div>
                    )
                }
            </CardContent>
        </Card>

    )
}

export default WaitingListCard