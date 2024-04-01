// components/BreadcrumbDynamic.tsx

import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb'; // 경로는 프로젝트에 맞게 조정하세요.

interface BreadcrumbRoute {
    name: string;
    path?: string; // 'path'가 optional이므로, 마지막 항목에는 경로를 제공하지 않을 수 있습니다.
}

interface BreadcrumbDynamicProps {
    routes: BreadcrumbRoute[];
}

const BreadcrumbDynamic: React.FC<BreadcrumbDynamicProps> = ({ routes }) => {
    return (
        <Breadcrumb className="mb-5">
            <BreadcrumbList>
                {routes.map((route, index) => (
                    <BreadcrumbItem key={index}>
                        {route.path ? (
                            <BreadcrumbLink>
                                <Link href={route.path}>{route.name}</Link>
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{route.name}</BreadcrumbPage>
                        )}
                        {index < routes.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbDynamic;
