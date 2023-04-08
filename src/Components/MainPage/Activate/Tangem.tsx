import { useState } from 'react'

export default function Tangem(props: any) {
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    const [isActivated, setIsActivated] = useState<boolean>(false)
    const [isActivating, setIsActivating] = useState<boolean>(false)
    async function activateTangemCard(bearer: string) {

        const prefillRequest = await fetch(`${import.meta.env.VITE_XAPP_TANGEM_ENDPOINT}${props.xAppToken}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Content-Type': 'application/json',
            }
        })
        const prefillResult = await prefillRequest.json();
        if (prefillResult.activated === true) {
            window.setTimeout(() => {
                setShowConfetti(true);
                setIsActivated(true);
            }, 2000)
        }

    }
    return (
        <div className="">
            {showConfetti &&
                <></>
            }
            {!isActivated && !isActivating &&
                <>
                    <p className="m-0 text-secondary font-bold mb-4">Congrats! Your Tangem card seems to be eligible to be activated through Xumm.</p>
                    <p className="m-0 text-secondary">Please click the button below to pre fund your Tangem card with {props.amount} XRP.</p>
                </>
            }
            {isActivating && !isActivated &&
                <p className="m-0 text-secondary font-bold">We're activating your account. Please stand by.</p>
            }
            {isActivated &&
                <>
                    <p className="m-0 text-secondary font-bold">Your account has succesfully been activated!</p>
                    <p className="m-0 text-secondary">You can now close the xApp.</p>
                </>
            }
            <div className="fixed max-h-[195px] bg-theme-tint w-full bottom-0 border-t-[1px] border-t-[#EBECEE] flex items-center flex-col gap-4 pt-[22px] pb-[30px] pl-[20px] pr-[20px] left-0 ">
                <button onClick={() => {
                    isActivated ?
                        props.xumm.xapp.close()
                        :
                        setIsActivating(true); activateTangemCard(props.bearer)
                }} className={`button ${isActivated ? 'bg-black' : 'bg-[rgb(var(--colorBlue))]'} text-white w-full py-[16px] rounded-[20px] text-lg flex items-center justify-center gap-2 active:outline-none focus:outline-none`}>
                    {isActivating && !isActivated ?
                        <>
                            <span className="block w-4 h-4 rounded-full border-[3px] border-white !border-t-transparent animate-spin"></span>
                            Activating
                        </>
                        :
                        <>
                            {isActivated ? "Close xApp" :
                                'Activate'}
                        </>
                    }
                </button>
            </div>
        </div >
    )

};
