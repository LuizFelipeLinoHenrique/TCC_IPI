import Tabs from "@/src/components/TopMenu";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Pedidos() {
    const [activeTab, setActiveTab] = useState("pedidos");

    return (
        <View style={{ flex: 1 }}>

            <Tabs
                tabs={[
                    {
                        label: "Pedidos",
                        value: "pedidos",
                    },
                    {
                        label: "Adicionar pedido",
                        value: "adicionar",
                    },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {activeTab === "pedidos" && (
                <View>
                    <Text>Lista de pedidos</Text>
                </View>
            )}

            {activeTab === "adicionar" && (
                <View>
                    <Text>Formulário para adicionar pedido</Text>
                </View>
            )}

        </View>
    );
}