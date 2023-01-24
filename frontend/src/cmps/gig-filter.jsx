import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AiOutlineSearch } from "react-icons/ai"

import { setfilter } from "../store/gig/gig.action.js"
import { gigService } from "../services/gig.service.js"

export function GigFilter({ searchBtnContent, placeholderTxt }) {
    const navigate = useNavigate()
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [scroll, setScroll] = useState(false)

    const changeScroll = () => {
        if (window.scrollY > 100) setScroll(true)
        else setScroll(false)
    }
    window.addEventListener('scroll', changeScroll)

    useEffect(() => {
        if (!filterByToEdit.tags) return
        setfilter(filterByToEdit)
        // navigate('/gig')
    }, [filterByToEdit])

    function onChange({ target }) {
        const { name: field, value } = target
        setFilterByToEdit((prev) => { return { ...prev, [field]: value } })
    }

    // function onClickSuggest(value) {
    //     setFilterByToEdit((prev) => { return { ...prev, tags: value, txt: '' } })
    //     console.log("onclick ", filterByToEdit)
    //     setfilter(filterByToEdit)
    //     navigate('/gig')
    // }

    function onFilterSubmit(ev) {
        ev?.preventDefault()
        setfilter(filterByToEdit)
        navigate('/gig')
    }

    return <form className={(!scroll && window.location.hash === '#/') ? 'filter-form before-scroll-hide' : 'filter-form'} onSubmit={onFilterSubmit}>
        <input
            className="search-bar"
            type="text"
            id="txt"
            name="txt"
            placeholder={placeholderTxt}
            value={filterByToEdit.txt}
            onChange={onChange}
        />
        <button className="search-bar-btn">{searchBtnContent}</button>
    </form>
}