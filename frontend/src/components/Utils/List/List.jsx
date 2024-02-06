import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import {
  GENDER_OPTIONS_FILTER,
  IS_ACTIVE_OPTIONS_FILTER,
  IS_REVISED_OPTIONS_FILTER,
  SAMPLE_FILTER_BY_OPTIONS,
  SAMPLE_TYPE_OPTIONS_FILTER,
  USER_FILTER_BY_OPTIONS,
  USER_ROLES,
} from "../../../global/global";

import styles from "./List.module.css";
import ListItem from "./ListItem";
import {
  getMeasurementProceduresRequest,
  getSampleTypesRequest,
} from "../../../global/fetch/fetch";

const List = (props) => {
  const [list, setList] = useState(props.list);
  const disabled = !props.admin;

  const [activeList, setActiveList] = useState(list);

  const inputValueRef = useRef();

  const [fliterBy, setFilterBy] = useState("NULL");

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [role, setRole] = useState("P");

  const [sampleTypeOptionsFilter, setSampleTypesOptionFilter] = useState([]);
  const [
    measurementProcedureOptionFilter,
    setMeasurementProcedureOptionFilter,
  ] = useState([]);

  useEffect(() => {
    const fetchSampleTypesAndMeasurementProcedures = async () => {
      const sampleTypes = await getSampleTypesRequest();
      const measurementProcedures = await getMeasurementProceduresRequest();

      sampleTypes.push({
        value: "NULL",
        name: "All",
      });

      measurementProcedures.push({
        value: "NULL",
        name: "All",
      });

      setSampleTypesOptionFilter(
        sampleTypes.map((sample) => {
          return {
            value: sample.value ? sample.value : sample.name,
            name: sample.name,
          };
        })
      );

      setMeasurementProcedureOptionFilter(
        measurementProcedures.map((measurement) => {
          return {
            value: measurement.value ? measurement.value : measurement.name,
            name: measurement.name,
          };
        })
      );
    };

    fetchSampleTypesAndMeasurementProcedures();
  }, []);

  const roleOptionChangeHandler = (value) => {
    setSelectedIndex(-1);
    setActiveList(list);
    inputValueRef.current.value = "";

    if (value !== role) {
      setRole(value);
      props.onRoleChange(value);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
    inputValueRef.current.value = "";

    setList(props.list);
    setActiveList(props.list);
  }, [role, props.list]);

  const filterByChangeHandler = (value) => {
    setSelectedIndex(-1);
    setActiveList(list);
    inputValueRef.current.value = "";

    setFilterBy(value);
  };

  const genderOptionChangeHandler = (value) => {
    setSelectedIndex(-1);
    setActiveList(list);
    inputValueRef.current.value = "";

    if (value === "NULL") {
      setActiveList(list);
      return;
    }

    setActiveList(() => {
      return list.filter((item) => {
        return item.gender === value;
      });
    });
  };

  const isActiveOptionChangeHandler = (value) => {
    setSelectedIndex(-1);
    setActiveList(list);
    inputValueRef.current.value = "";

    if (value === "NULL") {
      setActiveList(list);
      return;
    }

    const booleanValue = value === "A";
    setActiveList(() => {
      return list.filter((item) => {
        return item.isActive === booleanValue;
      });
    });
  };

  const isRevisedOptionHandler = (value) => {
    setSelectedIndex(-1);
    setActiveList(list);
    inputValueRef.current.value = "";

    if (value === "NULL") {
      setActiveList(list);
      return;
    }

    const booleanValue = value === "Y";
    setActiveList(() => {
      return list.filter((item) => {
        return item.isRevised === booleanValue;
      });
    });
  };

  const sampleTypeOptionHandler = (value) => {
    setSelectedIndex(-1);
    setActiveList(list);
    inputValueRef.current.value = "";

    if (value === "NULL") {
      setActiveList(list);
      return;
    }

    setActiveList(() => {
      return list.filter((item) => {
        return item.type === value;
      });
    });
  };

  const measurementProcedureOptionHandler = (value) => {
    setSelectedIndex(-1);
    setActiveList(list);
    inputValueRef.current.value = "";

    if (value === "NULL") {
      setActiveList(list);
      return;
    }

    setActiveList(() => {
      return list.filter((item) => {
        return item.type === value;
      });
    });
  };

  const inputChangeHandler = () => {
    setSelectedIndex(-1);
    const value = inputValueRef.current.value;

    if (value === "" || fliterBy === "NULL") {
      setActiveList(list);
      return;
    }

    if (props.users) {
      if (fliterBy === USER_FILTER_BY_OPTIONS[0].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.username.toLowerCase().includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === USER_FILTER_BY_OPTIONS[1].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.name.toLowerCase().includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === USER_FILTER_BY_OPTIONS[2].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.phone.toLowerCase().includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === USER_FILTER_BY_OPTIONS[3].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.email.toLowerCase().includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === USER_FILTER_BY_OPTIONS[4].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.dob.toLowerCase().includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === USER_FILTER_BY_OPTIONS[5].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.startDate.toLowerCase().includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === USER_FILTER_BY_OPTIONS[6].value) {
        if (item.endDate) {
          setActiveList(() => {
            return list.filter((item) => {
              return item?.endDate.toLowerCase().includes(value.toLowerCase());
            });
          });
        }
      }
    } else {
      if (fliterBy === SAMPLE_FILTER_BY_OPTIONS[0].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item?.serialNumber
              .toLowerCase()
              .includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === SAMPLE_FILTER_BY_OPTIONS[1].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.issuedAt.toLowerCase().includes(value.toLowerCase());
          });
        });
      }

      if (fliterBy === SAMPLE_FILTER_BY_OPTIONS[2].value) {
        setActiveList(() => {
          return list.filter((item) => {
            return item.test.toLowerCase().includes(value.toLowerCase());
          });
        });
      }
    }
  };

  return (
    <section className={styles["list"]}>
      <input
        type="text"
        name="search"
        placeholder="Search here..."
        className={styles["input"]}
        ref={inputValueRef}
        onChange={inputChangeHandler}
        style={{ marginBottom: "3vh" }}
      />
      <div className={styles["input-container"]}>
        {props.users && (
          <Dropdown
            disabled={disabled}
            options={USER_ROLES}
            message={disabled ? "Patient" : `Select user role`}
            className={`${styles["menu"]} ${disabled ? "disabled" : ""}`}
            optionsClass={styles["menu-options"]}
            onSave={roleOptionChangeHandler}
          />
        )}

        <Dropdown
          options={
            props.users ? USER_FILTER_BY_OPTIONS : SAMPLE_FILTER_BY_OPTIONS
          }
          message={`Select filter by`}
          className={styles["menu"]}
          optionsClass={styles["menu-options"]}
          onSave={filterByChangeHandler}
        />

        {props.users && (
          <>
            <Dropdown
              options={GENDER_OPTIONS_FILTER}
              message={`Select user gender`}
              className={styles["menu"]}
              optionsClass={styles["menu-options"]}
              onSave={genderOptionChangeHandler}
            />

            {!disabled && (
              <Dropdown
                options={IS_ACTIVE_OPTIONS_FILTER}
                message={`Select is active?`}
                className={styles["menu"]}
                optionsClass={styles["menu-options"]}
                onSave={isActiveOptionChangeHandler}
              />
            )}
          </>
        )}

        {props.samples && (
          <>
            <Dropdown
              options={IS_REVISED_OPTIONS_FILTER}
              message={`Select is revised ?`}
              className={styles["menu"]}
              optionsClass={styles["menu-options"]}
              onSave={isRevisedOptionHandler}
            />

            <Dropdown
              options={sampleTypeOptionsFilter}
              message={`Select is sample type?`}
              className={styles["menu"]}
              optionsClass={styles["menu-options"]}
              onSave={sampleTypeOptionHandler}
            />

            <Dropdown
              options={measurementProcedureOptionFilter}
              message={`Select is measurement procedure?`}
              className={styles["menu"]}
              optionsClass={styles["menu-options"]}
              onSave={measurementProcedureOptionHandler}
            />
          </>
        )}
      </div>

      <p className={styles["records"]}>
        <span>Records:</span> {activeList.length}
      </p>
      <ul className={styles["list-card"]}>
        {activeList.length === 0 && (
          <div className={styles["empty-list"]}>
            <p>No Logs are found!</p>
          </div>
        )}

        {activeList.length > 0 &&
          activeList.map((item, index) => {
            return (
              <>
                {selectedIndex !== index ? (
                  <>
                    {props.users && (
                      <ListItem
                        className={styles["not-active-item"]}
                        user={item}
                        keyy={item.username}
                        onClick={() => {
                          setSelectedIndex(index);
                        }}
                      />
                    )}
                    {props.samples && (
                      <ListItem
                        className={styles["not-active-item"]}
                        sample={item}
                        keyy={item.username}
                        onClick={() => {
                          setSelectedIndex(index);
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {props.users && (
                      <ListItem
                        className={styles["active-item"]}
                        active={true}
                        user={item}
                        keyy={item.username}
                        onClose={() => {
                          setSelectedIndex(-1);
                        }}
                        onClick={() => {
                          setSelectedIndex(index);
                        }}
                      />
                    )}
                    {props.samples && (
                      <ListItem
                        className={styles["active-item"]}
                        active={true}
                        sample={item}
                        keyy={item.username}
                        onClose={() => {
                          setSelectedIndex(-1);
                        }}
                        onClick={() => {
                          setSelectedIndex(index);
                        }}
                      />
                    )}
                  </>
                )}
              </>
            );
          })}
      </ul>
    </section>
  );
};

export default List;
