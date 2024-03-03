"use client"
import { PaymentWidgetInstance, loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid";
import { PaymentItemsProps } from "@/types/product/type";
import PaymentItems from "./PaymentItems";

const clientKey = "test_ck_vZnjEJeQVxGD914a4qvY3PmOoBN0";

const PaymentModal = ({ products, carts, totalPrice, setOpen, setCarts }: PaymentItemsProps) => {
    const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
    const agreementsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderAgreement"]> | null>(null);
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
            <div className="fixed flex w-screen h-screen top-0 left-0 justify-center bg-white ">
                <div className="w-[850px]">
                    <div>
                        <h4 className="text-2xl">장바구니 목록</h4>
                        <p>총 4가지의 상품이 담겼습니다.</p>
                    </div>
                    <ul className="mt-10">
                        <PaymentItems carts={carts} setOpen={setOpen} setCarts={setCarts} />
                    </ul>
                </div>
                <div className="bg-gray-200 shadow-xl ml-10 w-[600px] rounded-lg">
                    <div ref={agreementRef} style={{ width: "100%" }} />
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
                                    successUrl: `${window.location.origin}/success`,
                                    failUrl: `${window.location.origin}/fail`,
                                });
                            } catch (error) {
                                console.error(error);
                            }
                        }} className="text-center mt-10 bg-main w-full py-4 rounded-full text-white" >결제하기</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PaymentModal;




