import React from 'react';
import { useDidMount } from 'rooks';
import { isString } from 'lodash';
import { Button, Modal } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const DomainChangeModal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isShown, setIsShown] = React.useState(false);

    useDidMount(() => {
        const searchParams = new URLSearchParams(location.search);

        const redirectFromOldDomain = searchParams.get('redirectFromOldDomain');

        if (!isString(redirectFromOldDomain)) {
            return;
        }

        if (redirectFromOldDomain !== 'mrgrd56.ru') {
            return;
        }

        const redirectFromOldDomainLocalStorage = searchParams.get('redirectFromOldDomainLocalStorage');

        if (redirectFromOldDomainLocalStorage) {
            try {
                const parsedLocalStorage = JSON.parse(
                    window.decodeURIComponent(window.atob(redirectFromOldDomainLocalStorage))
                );
                Object.entries(parsedLocalStorage).forEach(([key, value]) => {
                    if (key && isString(value)) {
                        if (!localStorage.getItem(key)) {
                            localStorage.setItem(key, value);
                        }
                    }
                });

                console.log('Restored local storage from', parsedLocalStorage);
            } catch (e) {
                console.error('Unable to restore local storage', e);
            }
        }

        searchParams.delete('redirectFromOldDomain');
        searchParams.delete('redirectFromOldDomainLocalStorage');

        navigate({
            pathname: location.pathname,
            search: searchParams.toString()
        });

        setIsShown(true);
    });

    if (!isShown) {
        return null;
    }

    return (
        <Modal
            title="Внимание / Warning"
            visible={isShown}
            centered
            footer={[
                <Button key="ok" type="primary" onClick={() => setIsShown(false)}>
                    OK
                </Button>
            ]}
        >
            <h2>RU</h2>
            <p>
                Домен сайта был изменён на <strong>kiriru.su</strong>.<br />
                Перенаправление со старого домена <strong>mrgrd56.ru</strong> на новый будет работать ещё некоторое
                время.
                <br />
                Добавьте обновлённую ссылку на эту страницу в закладки, если хотите и дальше иметь доступ к сайту.
                <br />
                <br />
                Сообщение не будет появляться, если вы будете заходить по обновлённой ссылке.
            </p>

            <br />

            <h2>EN</h2>
            <p>
                The domain of this website has been changed to <strong>kiriru.su</strong>.<br />
                The redirection from the old domain <strong>mrgrd56.ru</strong> will work for some time.
                <br />
                Bookmark the new link to this page if you want to keep using this site.
                <br /> <br />
                This message will not appear if you use the updated link.
            </p>
        </Modal>
    );
};

export default DomainChangeModal;
