import styles from './styles.module.css'
import Layout from '../../commons/Layout';
import { Steps, Button } from 'antd';
import { useState } from 'react';

const FormContainer = ({ fields={}, errors={}, control={}, setPreview=()=>{}, handleSubmit=()=>{} }) => {

    const STEPS = [
        {
            title: 'Basic Details',
            key: 'first',
            content: (
                    <div>
                        <Layout
                            fields={fields?.main}
                            errors={errors}
                            control={control}
                        />
                        <Layout
                            fields={fields?.basic}
                            errors={errors}
                            control={control}
                        />
                    </div>           
            )
        },
        {
            title: 'Package & Charges Details',
            key: 'second',
            content: (
                <Layout
                    fields={fields?.package}
                    errors={errors}
                    control={control}
                />         
            )
        },
        {
            title: 'Handling Details',
            key: 'third',
            content: (
                <Layout
                    fields={fields?.handling}
                    errors={errors}
                    control={control}
                />        
            )
        },
    ];

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };
    
    const prev = () => {
        setCurrent(current - 1);
    };

    const onSubmit = () => {
		setPreview(true);
	};

    const items = STEPS.map((item) => ({ key: item.key, title: item.title }));

    return (
        <div className={styles.container}>
            <Steps current={current} items={items} />
            <div>{STEPS[current].content}</div>
            <div className={styles.button_container}>
                <div className={styles.button_div}>
                    {current > 0 && (
                        <Button
                            onClick={() => prev()}
                        >
                            BACK
                        </Button>
                    )}
                    {current < STEPS.length - 1 && (
                        <Button
                            onClick={handleSubmit(() => next())}
                        >
                            Next
                        </Button>
                    )}
                    {STEPS[current].key === 'third' && (
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            type="primary"
                        >
                            Generate Airway Bill
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FormContainer;