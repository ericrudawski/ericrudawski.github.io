import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

export default function BasicDoc() {
    const [data] = useState([
        {
            label: 'Argentina',
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'Croatia'
                        }
                    ]
                },
                {
                    label: 'France',
                    expanded: true,
                    children: [
                        {
                            label: 'France'
                        },
                        {
                            label: 'Morocco'
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart value={data} />
        </div>
    )
}
        