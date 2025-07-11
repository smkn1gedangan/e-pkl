import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export const useTypeAjuanTempat = create(
    persist(
        (set, get) => ({
            type: "sekolah",
            setType: (type) => {
                set({ type });
            },
        }),
        {
            name: "typeAjuanTempat",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
export const useTypeImportSiswa = create(
    persist(
        (set, get) => ({
            type: "import",
            setType: (type) => {
                set({ type });
            },
        }),
        {
            name: "typeImportSiswa",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
export const useTypeDashbard = create(
    persist(
        (set, get) => ({
            type: "grafik",
            setType: (type) => {
                set({ type });
            },
        }),
        {
            name: "typeDashbord",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
