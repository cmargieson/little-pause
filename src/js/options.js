import React from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  CheckBox,
  Collapsible,
  Form,
  FormField,
  Grommet,
  Heading,
  List,
  MaskedInput,
  Text,
  TextInput,
} from "grommet";
import { FormDown, FormNext, FormTrash } from "grommet-icons";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

const MenuButton = ({ label, open, submenu, ...rest }) => {
  const Icon = open ? FormDown : FormNext;
  return (
    <Button {...rest}>
      <Box
        align="center"
        direction="row"
        margin={submenu ? { left: "small" } : undefined}
        pad="xsmall"
      >
        <Icon color="brand" />
        <Text size="small">{label}</Text>
      </Box>
    </Button>
  );
};

const App = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      chrome.storage.sync.get(["data"], (result) => {
        if (Array.isArray(result.data)) {
          setData(result.data);
        }
      });
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const setData = () => {
      chrome.storage.sync.set({ data });
    };
    setData();
  }, [data]);

  // URL Input
  const [url, setUrl] = React.useState("");

  // Time Input
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  // Day Input
  const initialDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeMask = [
    {
      length: [1, 2],
      options: Array.from({ length: 12 }, (v, k) => k + 1),
      regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
      placeholder: "hh",
    },
    { fixed: ":" },
    {
      length: 2,
      options: ["00", "15", "30", "45"],
      regexp: /^[0-5][0-9]$|^[0-9]$/,
      placeholder: "mm",
    },
    { fixed: " " },
    {
      length: 2,
      options: ["am", "pm"],
      regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
      placeholder: "ap",
    },
  ];

  const [checkedDays, setCheckedDays] = React.useState(initialDays);

  const onCheckAllDays = (checked) => {
    if (checked) {
      setCheckedDays(initialDays);
    } else {
      setCheckedDays([]);
    }
  };

  const onCheckDay = (checked, day) => {
    if (checked) {
      setCheckedDays([...checkedDays, day]);
    } else {
      setCheckedDays(checkedDays.filter((checkedDay) => checkedDay !== day));
    }
  };

  // UI
  const [openTimeMenu, setOpenTimeMenu] = React.useState(false);
  const [openDayMenu, setOpenDayMenu] = React.useState(false);

  const resetForm = () => {
    setUrl("");
    setStartTime("");
    setEndTime("");
    setCheckedDays(initialDays);

    setOpenTimeMenu(false);
    setOpenDayMenu(false);
  };

  const saveForm = () => {
    const newData = { id: uuidv4(), url, startTime, endTime, checkedDays };
    setData([...data, newData]);
    resetForm();
  };

  return (
    <Box align="center" gap="medium" pad="large">
      <Box border gap="medium" pad="large" width="xlarge">
        <Form onReset={() => resetForm()} onSubmit={() => saveForm()}>
          <Box gap="medium">
            <FormField
              label="Website"
              name="website"
              validate={(fieldData) => {
                if (!validator.isURL(fieldData)) {
                  return "Please enter a URL in the format https://www.facebook.com/";
                }
              }}
            >
              <TextInput
                onChange={(event) => setUrl(event.target.value)}
                name="website"
                placeholder="https://www.facebook.com/"
                value={url}
              />
            </FormField>
          </Box>

          <MenuButton
            label="Time"
            onClick={() => setOpenTimeMenu(!openTimeMenu)}
            open={openTimeMenu}
          />
          <Collapsible open={openTimeMenu}>
            <Box direction="row" gap="small" margin={{ left: "medium" }}>
              <FormField label="Start Time" name="startTime">
                <MaskedInput
                  mask={timeMask}
                  name="startTime"
                  onChange={(event) => setStartTime(event.target.value)}
                  value={startTime}
                />
              </FormField>

              <FormField label="End Time" name="endTime">
                <MaskedInput
                  mask={timeMask}
                  name="endTime"
                  onChange={(event) => setEndTime(event.target.value)}
                  value={endTime}
                />
              </FormField>
            </Box>
          </Collapsible>

          <MenuButton
            label="Days"
            onClick={() => setOpenDayMenu(!openDayMenu)}
            open={openDayMenu}
          />
          <Collapsible open={openDayMenu}>
            <Box gap="small" margin={{ left: "medium" }}>
              <CheckBox
                checked={checkedDays.length === initialDays.length}
                indeterminate={
                  checkedDays.length > 0 &&
                  checkedDays.length < initialDays.length
                }
                label="All Days"
                onChange={(event) => onCheckAllDays(event.target.checked)}
              />
              {initialDays.map((day) => (
                <CheckBox
                  checked={checkedDays.includes(day)}
                  key={day}
                  label={day}
                  onChange={(event) => onCheckDay(event.target.checked, day)}
                />
              ))}
            </Box>
          </Collapsible>

          <Box direction="row" gap="medium" justify="end">
            <Button label="Reset" type="reset" />
            <Button label="Save" primary type="submit" />
          </Box>
        </Form>
      </Box>

      <Box border gap="medium" pad="large" width="xlarge">
        <Box gap="medium">
          <List
            action={(item) => (
              <Button
                plain
                icon={<FormTrash />}
                onClick={() => {
                  setData(data.filter((datum) => datum.id !== item.id));
                }}
              />
            )}
            data={data}
          >
            {(datum, index) => (
              <Box direction="column" key={index}>
                <Heading margin="none" size="small">
                  {datum.url}
                </Heading>

                <Text>
                  {datum.startTime &&
                    datum.endTime &&
                    `Paused ${datum.startTime} to ${datum.endTime}.`}
                </Text>

                <Text>
                  {datum.checkedDays &&
                    datum.checkedDays.length === initialDays.length &&
                    `Every day.`}

                  {datum.checkedDays &&
                    datum.checkedDays.length < initialDays.length &&
                    datum.checkedDays.map((checkedDay, index) =>
                      index !== datum.checkedDays.length - 1
                        ? `${checkedDay}, `
                        : `${checkedDay}.`
                    )}
                </Text>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

ReactDOM.render(
  <Grommet>
    <App />
  </Grommet>,
  document.getElementById("root")
);
