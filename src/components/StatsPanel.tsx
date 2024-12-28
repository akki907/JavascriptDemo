import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Stats } from "@/types/type";
import { Card, CardContent } from "./ui/card";

interface StatsPanelProps {
    stats: Stats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => (
    <Card className="mt-4">
        <CardContent className="pt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(Object.entries(stats) as [keyof Stats, string | number][]).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell className="text-right">{value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);