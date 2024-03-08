"use client"
import { PaymentWidgetInstance, loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid";
import { PaymentItemsProps } from "@/types/product/type";
import PaymentItems from "./PaymentItems";
import { useRouter } from "next/navigation";

const clientKey = "test_ck_vZnjEJeQVxGD914a4qvY3PmOoBN0";

const PaymentModal = ({ id, products, carts, totalPrice, setOpen, setCarts }: PaymentItemsProps) => {
    const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
    const agreementRef = useRef(null);

    useEffect(() => {
        loadPaymentWidget(clientKey, ANONYMOUS)
            .then((widget) => {
                setPaymentWidget(widget);
            })
            .catch((error) => {
                console.error("Error loading payment widget:", error);
            });
    }, []);

    useEffect(() => {
        if (!paymentWidget || !agreementRef.current) return;

        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            "#payment-widget",
            { value: totalPrice! },
            { variantKey: "DEFAULT" }
        );

        paymentMethodsWidgetRef.current = paymentMethodsWidget;

        console.log(paymentMethodsWidgetRef.current)

        paymentWidget.renderAgreement(agreementRef.current, {
            variantKey: "AGREEMENT",
        });
    }, [paymentWidget, agreementRef.current]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;
        if (!paymentMethodsWidget) return;

        paymentMethodsWidget.updateAmount(totalPrice!);
    }, [totalPrice]);

    return (
        <>
            <div className="fixed flex w-screen h-screen z-50 top-0 left-0 justify-center bg-white p-16">
                <div className="w-[850px] overflow-hidden">
                    <div>
                        <h4 className="text-2xl font-semibold">장바구니 목록</h4>
                        <p className="text-sm font-light">총 {carts?.length}가지의 상품이 담겼습니다.</p>
                    </div>
                    <ul className="mt-10 overflow-scroll h-full">
                        <PaymentItems carts={carts} setOpen={setOpen} setCarts={setCarts} />
                    </ul>
                </div>
                <div className="p-10 items-center border shadow-lg ml-10 w-[600px] rounded-2xl">
                    <div ref={agreementRef} className="mt-10" style={{ width: "100%" }} />
                    <div id="payment-widget" style={{ width: "100%" }} />
                    <div id="agreement" style={{ width: "100%" }} />
                    <div style={{ paddingLeft: "24px" }}>
                    </div>
                    <div className="result wrapper">
                        <button onClick={async () => {
                            try {
                                await paymentWidget?.requestPayment({
                                    orderId: nanoid(),
                                    orderName: '아이스 아메리카노 외 1건',
                                    successUrl: `${window.location.origin}/companies/${id}/success`,
                                    failUrl: `${window.location.origin}/companies/${id}/fail`,
                                });
                            } catch (error) {
                                console.error(error);
                            }
                        }} className={`text-center mt-10 ${totalPrice == 0 ? "hidden" : "bg-main"} w-full py-4 rounded-full text-white`}>₩{totalPrice?.toLocaleString()} 결제하기</button>
                        <p className=" text-center text-red-500 mt-5">{totalPrice == 0 && "상품을 담고 결제를 진행해 주세요"}</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PaymentModal;




