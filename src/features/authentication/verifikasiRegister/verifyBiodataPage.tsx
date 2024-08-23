import React from "react";
import { Link } from "react-router-dom";

const VerifyBiodataPage: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-[340px] mb-10">
                <h1 className="text-[28px] font-medium">Formulir Data Diri</h1>
                <form className="w-full mt-8 space-y-6">
                    <div className="space-y-1">
                        <label
                            htmlFor="nama"
                            className="block text-xs font-light"
                        >
                            Nama Lengkap
                        </label>
                        <input
                            type="nama"
                            id="nama"
                            placeholder="Nama Lengkap"
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="nik"
                            className="block text-xs font-light"
                        >
                            NIK
                        </label>
                        <input
                            type="number"
                            id="nik"
                            placeholder="NIK"
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="tanggalLahir"
                            className="block text-xs font-light"
                        >
                            Tanggal Lahir
                        </label>
                        <input
                            type="date"
                            id="tanggalLahir"
                            placeholder="dd/mm/yyyy"
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="alamat"
                            className="block text-xs font-light"
                        >
                            Alamat Domisili
                        </label>
                        <input
                            type="text"
                            id="alamat"
                            placeholder="Alamat Domisili"
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="space-y-1">
                            <label
                                htmlFor="rekening"
                                className="block text-xs font-light"
                            >
                                Tujuan Membuka Rekening
                            </label>
                            <select
                                name="rekening"
                                id="rekening"
                                className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                            >
                                <option value="" selected disabled hidden>
                                    Pilih Tujuan
                                </option>
                                <option value="bisnis">Tabungan</option>
                                <option value="investasi">Investasi</option>
                                <option value="bisnis">Bisnis</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-4 text-base font-bold">
                        <Link
                            to="/register/tipe-rekening"
                            className="py-3 border-[#055287] rounded-lg text-[#055287] w-1/2 border text-center"
                        >
                            Kembali
                        </Link>
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

export default VerifyBiodataPage;
