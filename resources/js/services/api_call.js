import { useQuery } from "@tanstack/react-query";
export const useGetProvince = () =>
    useQuery({
        queryKey: ["province"],
        queryFn: () =>
            fetch("https://open-api.my.id/api/wilayah/provinces").then((res) =>
                res.json()
            ),
    });
export const useGetRegencies = (id) =>
    useQuery({
        queryKey: ["regencies", id],
        queryFn: () =>
            fetch(`https://open-api.my.id/api/wilayah/regencies/${id}`).then(
                (res) => res.json()
            ),
    });
