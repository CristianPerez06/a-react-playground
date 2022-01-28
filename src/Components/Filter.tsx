import { useState, MouseEvent } from 'react'
import { OptionTypeBase } from 'react-select'
import AsyncSelect from 'react-select/async'

import './Filter.module.css'

// #region Async Filter component

type AsyncFilterProps = {
  placeholder?: string
  loadingMessage?: string
  isDisabled?: boolean
  fetchItems: (inputValue: string) => void
  onInputChange?: (newValue: string) => void
  onValueSelect?: (value: any) => void
};

const AsyncFilter: React.FC<AsyncFilterProps> = (props) => {
  // Props
  const {
    placeholder,
    loadingMessage = 'Loading...',
    isDisabled = false,
    fetchItems,
    onInputChange,
    onValueSelect
  } = props

  // State
  const [selectedValue, setSelectedValue] = useState<OptionTypeBase | null>(null)

  const ClearButton: React.FC = () => {
    return (
      <button
        onMouseDown={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          setSelectedValue(null)
        }}
      >
        X
      </button>
    )
  }

  return (
    <div className='async-filter'>
      <AsyncSelect
        placeholder={placeholder}
        value={selectedValue}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ClearIndicator: () => selectedValue?.value ? <ClearButton /> : null
        }}
        cacheOptions
        defaultOptions
        isClearable
        isDisabled={isDisabled}
        loadOptions={fetchItems}
        loadingMessage={() => loadingMessage}
        onInputChange={(value: string) => {
          onInputChange?.(value)
        }}
        onChange={(value: any) => {
          setSelectedValue(value)
          onValueSelect?.(value)
        }}
      />
    </div>
  )
}

// #endregion

// Fake API call
const fetchFilteredEvents = (inputValue: string) => {
  interface Event {
    readonly id: number
    readonly fancy_id: string
    readonly name: string
    readonly value: string
    readonly label: string
    readonly notSelectable?: boolean
  }

  const defaultEvents: readonly Event[] = [
    { id: 2736, fancy_id: "event-11", name: "Event 10", value: "2726", label: "Event 11", notSelectable: true },
    { id: 2735, fancy_id: "test-66-2021", name: "test 66", value: "2725", label: "test 66" },
    { id: 2734, fancy_id: "test-guido-55-2021", name: "test guido 55", value: "2724", label: "test guido 55" },
    { id: 2733, fancy_id: "c-test-8-2021", name: "c-test-8", value: "2723", label: "c-test-8" },
    { id: 2732, fancy_id: "2122-2021", name: "2133", value: "2722", label: "2722" },
    { id: 2731, fancy_id: "444test-event-2021", name: "444test event", value: "2722", label: "444test event" },
    { id: 2730, fancy_id: "test-mailing-2-2022", name: "test mailing 2", value: "2720", label: "test mailing 2022" },
    { id: 2729, fancy_id: "eee-2022", name: "test mails", value: "2719", label: "eee-2022" },
    { id: 2728, fancy_id: "test312312322-2022", name: "test312312321", value: "2718", label: "test312312322" },
    { id: 2727, fancy_id: "emails-2022", name: "emails", value: "2717", label: "emails" }
  ]
  
  const events: readonly Event[] = [
    { id: 2736, fancy_id: "event-10", name: "Event 10", value: "2736", label: "Event 10" },
    { id: 2735, fancy_id: "test-55-2021", name: "test 55", value: "2735", label: "test 55" },
    { id: 2734, fancy_id: "test-guido-44-2021", name: "test guido 44", value: "2734", label: "test guido 44" },
    { id: 2733, fancy_id: "c-test-7-2021", name: "c-test-7", value: "2733", label: "c-test-7" },
    { id: 2732, fancy_id: "2134-2021", name: "2134", value: "2732", label: "2732" },
    { id: 2731, fancy_id: "333test-event-2021", name: "333test event", value: "2731", label: "333test event" },
    { id: 2730, fancy_id: "test-mailing-2-2021", name: "test mailing 2", value: "2730", label: "test mailing 2" },
    { id: 2729, fancy_id: "ddd-2021", name: "test mails", value: "2729", label: "test mails" },
    { id: 2728, fancy_id: "test312312321-2021", name: "test312312321", value: "2728", label: "test312312321" },
    { id: 2727, fancy_id: "mails-2021", name: "mails", value: "2727", label: "mails" },
    ...defaultEvents
  ]
  
  const filterEvents = (inputValue: string) => {
    return events.filter((i: any) => {
      return i.name.toLowerCase().includes(inputValue.toLowerCase())
    })
  }

  return new Promise<any[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(filterEvents(inputValue));
    }, 1000)

    // reject(new Error('fail'))
  })
}

// Handlers
const handleInputChange = (newValue: string) => {
  console.log(newValue);
}

const handleValueSelect = (value: any) => {
  console.log({ ...value });
}

// Main component
const Filter: React.FC = () => {
  return (
    <div className='h-50 w-50' style={{ backgroundColor: 'white', padding: 20 + 'px' }}>
      <AsyncFilter
        placeholder='Search by item name'
        loadingMessage='Loading items...'
        fetchItems={fetchFilteredEvents}
        onInputChange={handleInputChange}
        onValueSelect={handleValueSelect}
      />
    </div>
  )
}

export default Filter

