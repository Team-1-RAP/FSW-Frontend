import React from "react";

const TypeRekeningPage: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-[340px] mb-20">
                <h1 className="text-[28px] font-medium">
                    Pilih Jenis Rekening
                </h1>
                <form className="w-full mt-8 space-y-6">
                    <div className="flex w-full space-y-2">
                        <div className="flex flex-col w-full space-y-6">
                            <div className="flex flex-row space-x-3 border border-[C4C4C4] px-4 py-2  rounded-xl">
                                <input
                                    type="radio"
                                    name="jenisRekening"
                                    id="bronze"
                                    value="bronze"
                                    className="w-[20px]"
                                />
                                <div className="space-y-1">
                                    <label htmlFor="bronze" className="text-lg">
                                        Bronze
                                    </label>
                                    <p className="text-[9px] text-[#A09FA4]">
                                        Rekening pemula dengan layanan dasar dan
                                        biaya rendah
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-3 border border-[C4C4C4] px-4 py-2  rounded-xl">
                                <input
                                    type="radio"
                                    name="jenisRekening"
                                    id="gold"
                                    value="gold"
                                    className="w-[20px]"
                                />
                                <div className="space-y-1">
                                    <label htmlFor="gold" className="text-lg">
                                        Gold
                                    </label>
                                    <p className="text-[9px] text-[#A09FA4]">
                                        Rekening dengan fitur tambahan dan
                                        layanan prioritas
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-3 border border-[C4C4C4] px-4 py-2  rounded-xl">
                                <input
                                    type="radio"
                                    name="jenisRekening"
                                    id="platinum"
                                    value="platinum"
                                    className="w-[20px]"
                                />
                                <div className="space-y-1">
                                    <label
                                        htmlFor="platinum"
                                        className="text-lg"
                                    >
                                        Platinum
                                    </label>
                                    <p className="text-[9px] text-[#A09FA4]">
                                        Rekening premium dengan layanan
                                        eksklusif
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center w-full space-x-4 text-base font-bold">
                        <button
                            type="submit"
                            className="py-3 bg-[#055287] rounded-lg text-white w-1/2"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TypeRekeningPage;
