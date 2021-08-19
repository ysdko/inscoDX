import React from 'react'
import Image from "next/image"
import hosino from "../public/hosino-50.jpg"

const Discribe = () => {
    return (
        <div className="card box box-bottom">
            <div className="card-header">
                <div className="card-body text-center p-0">
                    <p className="text-center text-underline m-0">リライト</p>
                    <p className="text-center text-underline m-0">ASIAN KUNGFU GENERATION</p>
                </div>
            </div>

            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <Image src={hosino}></Image>
                    </div>
                    <div className="col-6 d-flex flex-column text-center">
                        <div className="text-center mb-2">星野　ひなた</div>
                        <div className="row justify-content-between">
                            <div className="col">前回</div>
                            <div className="col">--.--点</div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col">前回</div>
                            <div className="col">--.--点</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discribe
